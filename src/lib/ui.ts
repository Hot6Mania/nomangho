export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined") {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn("Clipboard write failed", error);
    return false;
  }
}

export function showToast(message: string) {
  if (typeof window !== "undefined") {
    // Placeholder toast. Replace with a real toast system later.
    window.alert(message);
  } else {
    console.log(`[toast] ${message}`);
  }
}
