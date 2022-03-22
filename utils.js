const query = (name) => document.querySelector(`[name=${name}]`);

const readAsDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const formatMonth = (date) => date.toLocaleString('en-US', { month: 'long' });

const formatNamedDate = (date) => `${formatMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;

const formatMoney = (locale, currency, value) =>
  `${currency || ''} ${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)}`;

export { query, readAsDataURL, formatDate, formatMonth, formatNamedDate, formatMoney };
