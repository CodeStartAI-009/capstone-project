import json
import os
import re
from dataclasses import dataclass
from functools import lru_cache
from typing import Any
from urllib.parse import urlparse

try:
    import google.generativeai as genai
except Exception:
    genai = None

try:
    from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline
except Exception:
    AutoModelForSequenceClassification = None
    AutoTokenizer = None
    pipeline = None


SUSPICIOUS_KEYWORDS = {
    "account",
    "alert",
    "bank",
    "bonus",
    "confirm",
    "free",
    "gift",
    "login",
    "password",
    "paypal",
    "prize",
    "secure",
    "security",
    "signin",
    "support",
    "update",
    "verify",
    "wallet",
}


@dataclass
class UrlFeatures:
    domain: str
    ssl_status: str
    domain_length: int
    special_characters: int
    url_complexity: str
    suspicious_keywords: list[str]
    has_ip_address: bool
    subdomain_count: int


def normalize_url(raw_url: str) -> str:
    candidate = raw_url.strip()
    if not candidate:
        raise ValueError("URL is required.")
    if not re.match(r"^https?://", candidate, re.IGNORECASE):
        candidate = f"https://{candidate}"
    parsed = urlparse(candidate)
    if not parsed.netloc or "." not in parsed.netloc:
        raise ValueError("Enter a valid URL with a domain, for example https://example.com.")
    return candidate


def extract_features(url: str) -> UrlFeatures:
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    tokens = re.split(r"[^a-zA-Z0-9]+", url.lower())
    suspicious = sorted({token for token in tokens if token in SUSPICIOUS_KEYWORDS})
    special_count = sum(1 for char in url if not char.isalnum())
    has_ip = bool(re.search(r"(\d{1,3}\.){3}\d{1,3}", domain))
    subdomain_count = max(len(domain.split(".")) - 2, 0)
    complexity_score = len(url) + special_count * 2 + subdomain_count * 8 + (20 if has_ip else 0)
    complexity = "Low" if complexity_score < 80 else "Medium" if complexity_score < 130 else "High"
    return UrlFeatures(
        domain=domain,
        ssl_status="Uses HTTPS" if parsed.scheme == "https" else "No HTTPS",
        domain_length=len(domain),
        special_characters=special_count,
        url_complexity=complexity,
        suspicious_keywords=suspicious,
        has_ip_address=has_ip,
        subdomain_count=subdomain_count,
    )


@lru_cache(maxsize=1)
def get_model():
    if AutoTokenizer is None or AutoModelForSequenceClassification is None or pipeline is None:
        return None
    model_name = os.getenv("HF_MODEL_NAME", "ealvaradob/bert-finetuned-phishing")
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSequenceClassification.from_pretrained(model_name)
        return pipeline("text-classification", model=model, tokenizer=tokenizer)
    except Exception:
        return None


def warm_model() -> None:
    get_model()


def heuristic_prediction(url: str, features: UrlFeatures) -> dict[str, Any]:
    score = 0
    score += 22 if features.ssl_status == "No HTTPS" else 0
    score += min(len(features.suspicious_keywords) * 12, 36)
    score += 18 if features.has_ip_address else 0
    score += 12 if "@" in url else 0
    score += 10 if "-" in features.domain else 0
    score += 10 if features.domain_length > 28 else 0
    score += 8 if features.subdomain_count >= 2 else 0
    score += 8 if len(url) > 90 else 0
    score = min(score, 99)
    prediction = "Phishing" if score >= 45 else "Legitimate"
    confidence = max(68, score if prediction == "Phishing" else 100 - score)
    return {"prediction": prediction, "confidence": round(float(confidence), 2), "heuristic_score": score}


def model_prediction(url: str, fallback: dict[str, Any]) -> dict[str, Any]:
    classifier = get_model()
    if classifier is None:
        return fallback | {"model_source": "heuristic-fallback"}
    try:
        result = classifier(url, truncation=True)[0]
        label = str(result.get("label", "")).lower()
        score = float(result.get("score", 0.0)) * 100
        phishing_terms = ("phish", "malicious", "bad", "label_1")
        legitimate_terms = ("legit", "benign", "good", "safe", "label_0")
        if any(term in label for term in phishing_terms):
            prediction = "Phishing"
        elif any(term in label for term in legitimate_terms):
            prediction = "Legitimate"
        else:
            prediction = fallback["prediction"]
        return {"prediction": prediction, "confidence": round(score, 2), "model_source": "hugging-face"}
    except Exception:
        return fallback | {"model_source": "heuristic-fallback"}


def calculate_risk(prediction: str, confidence: float, features: UrlFeatures, heuristic_score: int) -> tuple[int, str]:
    base = confidence if prediction == "Phishing" else 100 - confidence
    feature_boost = heuristic_score * 0.45
    risk_score = int(min(100, max(0, (base * 0.7) + feature_boost)))
    if risk_score >= 85:
        return risk_score, "Critical"
    if risk_score >= 65:
        return risk_score, "High"
    if risk_score >= 35:
        return risk_score, "Medium"
    return risk_score, "Low"


def threat_category(features: UrlFeatures) -> str:
    if {"login", "password", "signin"} & set(features.suspicious_keywords):
        return "Credential Harvesting"
    if {"bank", "paypal", "wallet"} & set(features.suspicious_keywords):
        return "Financial Impersonation"
    if {"gift", "prize", "free", "bonus"} & set(features.suspicious_keywords):
        return "Reward Scam"
    if features.has_ip_address:
        return "Obfuscated Host"
    return "URL Reputation"


def fallback_gemini(url: str, prediction: str, risk: str, features: UrlFeatures) -> dict[str, Any]:
    suspicious_text = ", ".join(features.suspicious_keywords) or "no obvious suspicious keywords"
    if prediction == "Phishing":
        summary = (
            f"This URL has a {risk.lower()} risk profile. It contains {suspicious_text} and should be treated "
            "carefully until verified through an official channel."
        )
    else:
        summary = "The URL looks lower risk based on available signals, but you should still verify the domain before sharing sensitive data."
    return {
        "summary": summary,
        "recommendations": [
            "Do not enter passwords, card numbers, or one-time codes unless the domain is verified.",
            "Open the official website manually instead of following the link.",
            "Report suspicious links to your security team or email provider.",
        ],
        "precautions": [
            "Enable multi-factor authentication on important accounts.",
            "Keep your browser, operating system, and antivirus tools updated.",
            "Reset passwords if you already submitted credentials on this page.",
        ],
        "safety_tips": [
            "Check the exact domain spelling before signing in.",
            "Look for HTTPS, but remember HTTPS alone does not prove a site is safe.",
            "Avoid downloading files from unexpected pages.",
        ],
    }


def gemini_analysis(url: str, prediction: str, confidence: float, risk: str, features: UrlFeatures) -> dict[str, Any]:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or genai is None:
        return fallback_gemini(url, prediction, risk, features)
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"""
Return only valid JSON with keys summary, recommendations, precautions, safety_tips.
URL: {url}
Prediction: {prediction}
Confidence: {confidence}
Risk level: {risk}
Domain: {features.domain}
Suspicious keywords: {features.suspicious_keywords}
Explain in simple language why this may be phishing and give concise security guidance.
"""
        response = model.generate_content(prompt)
        text = response.text.strip().strip("`")
        text = re.sub(r"^json", "", text, flags=re.IGNORECASE).strip()
        parsed = json.loads(text)
        return {
            "summary": str(parsed.get("summary", ""))[:900],
            "recommendations": list(parsed.get("recommendations", []))[:6],
            "precautions": list(parsed.get("precautions", []))[:6],
            "safety_tips": list(parsed.get("safety_tips", []))[:6],
        }
    except Exception:
        return fallback_gemini(url, prediction, risk, features)


def analyze_url(raw_url: str) -> dict[str, Any]:
    url = normalize_url(raw_url)
    features = extract_features(url)
    fallback = heuristic_prediction(url, features)
    model_result = model_prediction(url, fallback)
    risk_score, risk = calculate_risk(
        model_result["prediction"],
        model_result["confidence"],
        features,
        fallback["heuristic_score"],
    )
    gemini = gemini_analysis(url, model_result["prediction"], model_result["confidence"], risk, features)
    return {
        "url": url,
        "prediction": model_result["prediction"],
        "confidence": model_result["confidence"],
        "risk": risk,
        "risk_score": risk_score,
        "threat_category": threat_category(features),
        "model_source": model_result["model_source"],
        "features": {
            "domain": features.domain,
            "ssl_status": features.ssl_status,
            "domain_length": features.domain_length,
            "special_characters": features.special_characters,
            "url_complexity": features.url_complexity,
            "suspicious_keywords": features.suspicious_keywords,
            "has_ip_address": features.has_ip_address,
            "subdomain_count": features.subdomain_count,
        },
        "gemini": gemini,
    }
