import { format as formatFns } from 'date-fns';

export const DEFAULT_DATE_FORMAT = 'MM/dd/yyyy';

export const DEFAULT_LOCALE = 'en-US';

export const DEFAULT_CURRENCY = 'USD';

export const uuid = () => crypto.randomUUID();

export const isSameDate = (date1?: Date, date2?: Date) =>
  date1 &&
  date2 &&
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const daysBetween = (startDate: Date, endDate: Date) => {
  const diff = Math.abs(startDate.getTime() - endDate.getTime());

  return Math.ceil(diff / (1000 * 3600 * 24));
};

export const formatDate = (date: Date, format: string = DEFAULT_DATE_FORMAT) => formatFns(date, format);

export const formatMonth = (date: Date, locale: string = DEFAULT_LOCALE) =>
  date.toLocaleString(locale, { month: 'long' });

export const formatNamedDate = (date: Date, locale: string = DEFAULT_LOCALE) =>
  `${formatMonth(date, locale)} ${date.getDate()}, ${date.getFullYear()}`;

export const formatMoney = (value: number | string, currency?: string, locale: string = DEFAULT_LOCALE) => {
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency || DEFAULT_CURRENCY
  });
  const formattedNumber = numberFormat.format(Number(value));

  return `${currency ? `${currency} ` : ''}${formattedNumber}`;
};

export const totalize = <T>(callback: (item: T) => number | undefined, list?: Array<T>) =>
  list?.reduce((previousValue, item) => previousValue + (callback(item) || 0), 0) || 0;

export const readAsDataURL = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const asDataURL = <T>(data: T) =>
  readAsDataURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));

export const scrollToElement = (elementId: string) =>
  setTimeout(() => document.getElementById(elementId)?.scrollIntoView(), 0);

// <editor-fold desc="Tests">
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('isSameDate', () => {
    expect(isSameDate(new Date(2022, 1, 1), new Date(2022, 1, 1))).toBeTruthy();
    expect(isSameDate(new Date(2021, 1, 1), new Date(2022, 1, 1))).toBeFalsy();
  });
  it('daysBetween', () => {
    const twoDays = daysBetween(new Date(2021, 1, 1), new Date(2021, 1, 3));
    expect(twoDays).toBe(2);

    const tenDays = daysBetween(new Date(2021, 1, 1), new Date(2021, 1, 11));
    expect(tenDays).toBe(10);

    const betweenMonths = daysBetween(new Date(2021, 1, 1), new Date(2021, 2, 11));
    expect(betweenMonths).toBe(38);
  });
  it('formatDate', () => {
    const formattedDateWithDefaultFormat = formatDate(new Date(2021, 1, 10));
    expect(formattedDateWithDefaultFormat).toBe('02/10/2021');

    const formattedDateWithCustomFormat = formatDate(new Date(2020, 2, 10), 'yyyy-MM-dd');
    expect(formattedDateWithCustomFormat).toBe('2020-03-10');
  });
  it('formatMonth', () => {
    const formattedMonth = formatMonth(new Date(2021, 1, 10));
    expect(formattedMonth).toBe('February');

    const formattedMonthPtBR = formatMonth(new Date(2021, 1, 10), 'pt-BR');
    expect(formattedMonthPtBR).toBe('fevereiro');
  });
  it('formatNamedDate', () => {
    const formattedDate = formatNamedDate(new Date(2021, 1, 10));
    expect(formattedDate).toBe('February 10, 2021');

    const formattedDatePtBR = formatNamedDate(new Date(2022, 1, 10), 'pt-BR');
    expect(formattedDatePtBR).toBe('fevereiro 10, 2022');
  });

  it('formatMoney', () => {
    const formattedMoney = formatMoney(1000);
    expect(formattedMoney).toBe('$1,000.00');

    const formattedMoneyWithString = formatMoney('2500');
    expect(formattedMoneyWithString).toBe('$2,500.00');

    const formattedMoneyPtBR = formatMoney(1200, 'BRL', 'pt-BR');
    expect(formattedMoneyPtBR).toBe('BRL R$ 1.200,00');
  });

  it('totalize', () => {
    const totalWithValue = totalize((item) => item.value, [{ value: 100 }, { value: 200 }, { value: 300 }]);
    expect(totalWithValue).toBe(600);

    const total = totalize((item) => item, [200, 300, 400]);
    expect(total).toBe(900);

    const totalEmpty = totalize<number>((item) => item);
    expect(totalEmpty).toBe(0);
  });

  it('asDataURL', async () => {
    const dataURL = await asDataURL({ name: 'John Doe' });
    expect(dataURL).toBe('data:application/json;base64,ewogICJuYW1lIjogIkpvaG4gRG9lIgp9');
  });
}

// </editor-fold>
