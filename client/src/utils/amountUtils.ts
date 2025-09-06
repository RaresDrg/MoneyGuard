export function validateInput(value: string) {
  return /^(0|[1-9]\d{0,8})(\.\d{0,2})?$/.test(value);
}

export function sanitizePastedValue(value: string): string {
  return value.replace(/[,\s\u00A0\u200B$]+/g, "").trim();
}

export function formatWithCommas(value: string) {
  return value.replace(/^(\d+)(?=\.)?/, (match) =>
    match.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

export function formatAmount(value: number) {
  const absoluteValue = Math.abs(value);
  const formattedValue = formatWithCommas(absoluteValue.toFixed(2));

  return value >= 0 ? `$ ${formattedValue}` : `$ -${formattedValue}`;
}
