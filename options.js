import { query } from './utils.js';
import { saveInvoice, loadInvoice } from './invoiceStorage.js';

const supplierDescriptionInput = query('supplierDescription');
const supplierAddressInput = query('supplierAddress');

const customerDescriptionInput = query('customerDescription');
const customerAddressInput = query('customerAddress');

const intermediaryBankInfoInput = query('intermediaryBankInfo');
const bankInfoInput = query('bankInfo');

const beneficiaryNameInput = query('beneficiaryName');
const beneficiaryIBANInput = query('beneficiaryIBAN');

const serviceDescriptionInput = query('serviceDescription');
const serviceLocaleInput = query('serviceLocale');
const serviceCurrencyInput = query('serviceCurrency');
const serviceValueInput = query('serviceValue');

const saveButton = query('save');

const createInvoice = () => ({
  supplier: {
    description: supplierDescriptionInput.value,
    address: supplierAddressInput.value
  },
  customer: {
    description: customerDescriptionInput.value,
    address: customerAddressInput.value
  },
  intermediaryBank: {
    info: intermediaryBankInfoInput.value
  },
  bank: {
    info: bankInfoInput.value
  },
  beneficiary: {
    name: beneficiaryNameInput.value,
    iban: beneficiaryIBANInput.value
  },
  service: {
    description: serviceDescriptionInput.value,
    locale: serviceLocaleInput.value,
    currency: serviceCurrencyInput.value,
    value: serviceValueInput.value
  }
});

const update = (enabled) => {
  saveButton.disabled = !enabled;
  saveButton.ariaDisabled = !enabled;
};

const load = async () => {
  const { supplier, customer, intermediaryBank, bank, beneficiary, service } = await loadInvoice();

  supplierDescriptionInput.value = supplier?.description || '';
  supplierAddressInput.value = supplier?.address || '';

  customerDescriptionInput.value = customer?.description || '';
  customerAddressInput.value = customer?.address || '';

  intermediaryBankInfoInput.value = intermediaryBank?.info || '';
  bankInfoInput.value = bank?.info || '';

  beneficiaryNameInput.value = beneficiary?.name || '';
  beneficiaryIBANInput.value = beneficiary?.iban || '';

  serviceDescriptionInput.value = service?.description || '';
  serviceLocaleInput.value = service?.locale || '';
  serviceCurrencyInput.value = service?.currency || '';
  serviceValueInput.value = service?.value || '';
};

const save = async () => {
  await saveInvoice(createInvoice());
  update(false);
};

[
  supplierDescriptionInput,
  supplierAddressInput,

  customerDescriptionInput,
  customerAddressInput,

  intermediaryBankInfoInput,
  bankInfoInput,

  beneficiaryNameInput,
  beneficiaryIBANInput,

  serviceDescriptionInput,
  serviceLocaleInput,
  serviceCurrencyInput,
  serviceValueInput
].forEach((input) => input.addEventListener('input', () => update(true)));

saveButton.addEventListener('click', save);

load();
