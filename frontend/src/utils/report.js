import jsPDF from "jspdf";

export function downloadReport(result) {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("SentinelURL Threat Report", 16, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const lines = [
    `URL: ${result.url}`,
    `Prediction: ${result.prediction}`,
    `Confidence: ${result.confidence}%`,
    `Risk: ${result.risk} (${result.risk_score}/100)`,
    `Threat Category: ${result.threat_category}`,
    `Domain: ${result.features?.domain}`,
    "",
    "Summary:",
    result.gemini?.summary || "No summary available.",
    "",
    "Recommended Actions:",
    ...(result.gemini?.recommendations || []).map((item) => `- ${item}`),
  ];
  doc.text(doc.splitTextToSize(lines.join("\n"), 178), 16, 32);
  doc.save("sentinel-url-report.pdf");
}

export async function shareResult(result) {
  const text = `SentinelURL result for ${result.url}: ${result.prediction}, ${result.risk} risk, ${result.confidence}% confidence.`;
  if (navigator.share) {
    await navigator.share({ title: "SentinelURL Result", text });
  } else {
    await navigator.clipboard.writeText(text);
  }
}

