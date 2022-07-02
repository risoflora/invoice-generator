import { format as formatFns } from 'date-fns';

const DEFAULT_DATE_FORMAT = 'MM/dd/yyyy';

const DEFAULT_LOCALE = 'en-US';

const DEFAULT_CURRENCY = 'USD';

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

const formatDate = (date: Date, format: string = DEFAULT_DATE_FORMAT) => formatFns(date, format);

const formatMonth = (date: Date, locale: string) => date.toLocaleString(locale, { month: 'long' });

const formatNamedDate = (date: Date, locale: string) =>
  `${formatMonth(date, locale)} ${date.getDate()}, ${date.getFullYear()}`;

const formatMoney = (value: number, currency: string, locale: string) =>
  `${currency} ${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value || 0)}`;

const readAsDataURL = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const asDataURL = (data: any) => readAsDataURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));

export {
  DEFAULT_DATE_FORMAT,
  DEFAULT_LOCALE,
  DEFAULT_CURRENCY,
  isSameDate,
  daysBetween,
  formatDate,
  formatMonth,
  formatNamedDate,
  formatMoney,
  readAsDataURL,
  asDataURL
};
