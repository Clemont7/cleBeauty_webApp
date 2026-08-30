/** Prices are stored in cents of MZN (Metical). */
export function formatPrice(cents: number): string {
  const value = (cents / 100).toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${value} MT`;
}
