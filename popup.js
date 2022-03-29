import { query, daysBetween } from './utils.js';
import { loadInvoice } from './invoiceStorage.js';
import { DateInput } from './dateInput.js';
import { Report } from './report.js';

const referenceMonthInput = query('referenceMonth');
const referenceMonthDateInput = new DateInput(referenceMonthInput);

const dueOnInput = query('dueOn');
const dueOnDateInput = new DateInput(dueOnInput);

const daysCounterLabel = query('daysCounter');

const generateButton = query('generate');

const updateDaysCounter = () => {
  const days = daysBetween(dueOnDateInput.getDate(), referenceMonthDateInput.getDate());
  daysCounterLabel.textContent = days > 0 ? `Is due on ${days} day${days > 1 ? 's' : ''}` : '';
};

const update = () => {
  generateButton.disabled = !(referenceMonthDateInput.dates.length > 0 && dueOnDateInput.dates.length > 0);
  generateButton.ariaDisabled = generateButton.disabled;
  updateDaysCounter();
};

const updateDueOn = () => {
  const date = referenceMonthDateInput.getDate();
  dueOnDateInput.setDate({ clear: true });
  dueOnDateInput.setDate(date.setDate(date.getDate() + 10));
};

const load = () => {
  referenceMonthDateInput.setDate(new Date());
  updateDueOn();
};

const generate = async (options) =>
  chrome.downloads.download({ ...(await new Report(await loadInvoice()).generate(options)) });

referenceMonthInput.addEventListener('changeDate', () => {
  dueOnDateInput.setOptions({ minDate: referenceMonthDateInput.getDate() });
  updateDueOn();
  update();
});

dueOnInput.addEventListener('changeDate', () => update());

generateButton.addEventListener('click', () =>
  generate({ referenceMonth: referenceMonthDateInput.getDate(), dueOn: dueOnDateInput.getDate() })
);

load();
