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
  locale?: string;
  currency?: string;
  value?: string;
}

interface Invoice {
  supplier: Supplier;
  customer: Customer;
  intermediaryBank: IntermediaryBank;
  bank: Bank;
  beneficiary: Beneficiary;
  service: Service;
}

export type { Supplier, Customer, IntermediaryBank, Bank, Beneficiary, Service, Invoice };
