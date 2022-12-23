export function formatCurrency(currency) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    minimumFractionDigits: 1,
    currency: "INR",
  }).format(currency);
}
