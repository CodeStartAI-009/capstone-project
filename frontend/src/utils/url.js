export function isLikelyUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withProtocol);
    return parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

export const sampleUrls = [
  "https://paypal-login-secure.com",
  "https://www.microsoft.com/security",
  "http://192.168.1.44/update-password",
  "https://accounts.google.com",
];

