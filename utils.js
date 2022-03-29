const query = (name) => document.querySelector(`[name=${name}]`);

const readAsDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const formatDate = (date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;

const formatMonth = (date) => date.toLocaleString('en-US', { month: 'long' });

const formatNamedDate = (date) => `${formatMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;

const formatMoney = (locale, currency, value) =>
  `${currency || ''} ${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)}`;

function daysBetween(firstDate, secondDate) {
  const hours = 24;
  const minutes = 60;
  const seconds = 60;
  const milliseconds = 1000;
  const oneDay = hours * minutes * seconds * milliseconds;
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

export { query, readAsDataURL, formatDate, formatMonth, formatNamedDate, formatMoney, daysBetween };
