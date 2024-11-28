export function generateDateRange(daysBack: number, daysForward: number): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = -daysBack; i <= daysForward; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
}

export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}