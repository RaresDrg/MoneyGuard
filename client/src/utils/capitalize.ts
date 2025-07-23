export function capitalize(text: string): string {
  const capitalizedText = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return capitalizedText;
}
