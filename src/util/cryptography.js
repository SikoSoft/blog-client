export async function hash(data) {
  let digest = "";
  try {
    digest = Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data))
      )
    )
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    console.error(
      "Cryptography failure: are you sure you are using a modern web browser?"
    );
  }
  return digest;
}
