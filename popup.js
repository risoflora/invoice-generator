import { query, formatMonth } from './utils.js';
import { loadInvoice } from './invoiceStorage.js';
import { Report } from './report.js';

const referenceMonthInput = query('referenceMonth');

const generateButton = query('generate');

const load = () => (referenceMonthInput.value = formatMonth(new Date()));

const generate = async (referenceMonth) =>
  chrome.downloads.download({ ...(await new Report(await loadInvoice()).generate(referenceMonth)) });

generateButton.addEventListener('click', () => generate(referenceMonthInput.value));

load();
