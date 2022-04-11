function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function daysBetween(startDate: Date, endDate: Date) {
  const diff = Math.abs(startDate.getTime() - endDate.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;

const formatMonth = (date: Date) => date.toLocaleString('en-US', { month: 'long' });

const formatNamedDate = (date: Date) => `${formatMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;

const formatMoney = (locale: string, currency: string, value: number) =>
  `${currency || ''} ${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value || 0)}`;

const readAsDataURL = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const asDataURL = (data: any) => readAsDataURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));

export { isSameDate, daysBetween, formatDate, formatMonth, formatNamedDate, formatMoney, readAsDataURL, asDataURL };
