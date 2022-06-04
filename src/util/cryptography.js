export async function hash(data) {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
}
