interface Supplier {
  description?: string;
  address?: string;
}

interface Customer {
  description?: string;
  address?: string;
}

interface IntermediaryBank {
  info?: string;
}

interface Bank {
  info?: string;
}

interface Beneficiary {
  name?: string;
  iban?: string;
}

interface Service {
  description?: string;
  value?: number;
}

interface Configuration {
  dateFormat?: string;
  locale?: string;
  currency?: string;
}

interface Invoice {
  supplier?: Supplier;
  customer?: Customer;
  intermediaryBank?: IntermediaryBank;
  bank?: Bank;
  beneficiary?: Beneficiary;
  services?: Service[];
  configuration?: Configuration;
}

export type { Supplier, Customer, IntermediaryBank, Bank, Beneficiary, Service, Invoice };
