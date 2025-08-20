export function prettifyText(text: string) {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());
}
