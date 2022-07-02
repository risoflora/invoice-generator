import { useState } from 'react';

import { description as pkgDescription, version as pkgVersion } from '../../package.json';

import { useIsFirstRender } from '../hooks/useIsFirstRender';
import { DEFAULT_DATE_FORMAT, asDataURL } from '../core/utils';
import { load, save } from '../core/storage';
import { Invoice } from '../core/invoice';

import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import ButtonGroup from '../components/ButtonGroup';
import File from '../components/File';
import Link from '../components/Link';
import Button from '../components/Button';
import Nav from '../components/Nav';

import logo from '../favicon.svg';

const Options = () => {
  const [supplierDescription, setSupplierDescription] = useState<string>();
  const [supplierAddress, setSupplierAddress] = useState<string>();
  const [customerDescription, setCustomerDescription] = useState<string>();
  const [customerAddress, setCustomerAddress] = useState<string>();
  const [intermediaryBankInfo, setIntermediaryBankInfo] = useState<string>();
  const [bankInfo, setBankInfo] = useState<string>();
  const [beneficiaryName, setBeneficiaryName] = useState<string>();
  const [beneficiaryIBAN, setBeneficiaryIBAN] = useState<string>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  const [serviceValue, setServiceValue] = useState<string>();
  const [configurationDateFormat, setConfigurationDateFormat] = useState<string>();
  const [configurationLocale, setConfigurationLocale] = useState<string>();
  const [configurationCurrency, setConfigurationCurrency] = useState<string>();
  const [exportUrl, setExportUrl] = useState<string>();
  const [isSaved, setIsSaved] = useState(true);
  const isFirstRender = useIsFirstRender();

  const createInvoice = (): Invoice => ({
    supplier: {
      description: supplierDescription,
      address: supplierAddress
    },
    customer: {
      description: customerDescription,
      address: customerAddress
    },
    intermediaryBank: {
      info: intermediaryBankInfo
    },
    bank: {
      info: bankInfo
    },
    beneficiary: {
      name: beneficiaryName,
      iban: beneficiaryIBAN
    },
    service: {
      description: serviceDescription,
      value: serviceValue
    },
    configuration: {
      dateFormat: configurationDateFormat,
      locale: configurationLocale,
      currency: configurationCurrency
    }
  });

  const loadInvoice = (invoice: Invoice) => {
    const { supplier, customer, intermediaryBank, bank, beneficiary, service, configuration } = invoice;

    setSupplierDescription(supplier?.description || '');
    setSupplierAddress(supplier?.address || '');

    setCustomerDescription(customer?.description || '');
    setCustomerAddress(customer?.address || '');

    setIntermediaryBankInfo(intermediaryBank?.info || '');
    setBankInfo(bank?.info || '');

    setBeneficiaryName(beneficiary?.name || '');
    setBeneficiaryIBAN(beneficiary?.iban || '');

    setServiceDescription(service?.description || '');
    setServiceValue(service?.value || '');

    setConfigurationDateFormat(configuration?.dateFormat || '');
    setConfigurationLocale(configuration?.locale || '');
    setConfigurationCurrency(configuration?.currency || '');
  };

  const handleSupplierDescription = (value: string) => {
    setSupplierDescription(value);
    setIsSaved(false);
  };

  const handleSupplierAddress = (value: string) => {
    setSupplierAddress(value);
    setIsSaved(false);
  };

  const handleCustomerDescription = (value: string) => {
    setCustomerDescription(value);
    setIsSaved(false);
  };

  const handleCustomerAddress = (value: string) => {
    setCustomerAddress(value);
    setIsSaved(false);
  };

  const handleIntermediaryBankInfo = (value: string) => {
    setIntermediaryBankInfo(value);
    setIsSaved(false);
  };

  const handleBankInfo = (value: string) => {
    setBankInfo(value);
    setIsSaved(false);
  };

  const handleBeneficiaryName = (value: string) => {
    setBeneficiaryName(value);
    setIsSaved(false);
  };

  const handleBeneficiaryIBAN = (value: string) => {
    setBeneficiaryIBAN(value);
    setIsSaved(false);
  };

  const handleServiceDescription = (value: string) => {
    setServiceDescription(value);
    setIsSaved(false);
  };

  const handleServiceValue = (value: string) => {
    setServiceValue(value);
    setIsSaved(false);
  };

  const handleConfigurationDateFormat = (value: string) => {
    setConfigurationDateFormat(value);
    setIsSaved(false);
  };

  const handleConfigurationLocale = (value: string) => {
    setConfigurationLocale(value);
    setIsSaved(false);
  };

  const handleConfigurationCurrency = (value: string) => {
    setConfigurationCurrency(value);
    setIsSaved(false);
  };

  const handleImport = (content: string | undefined) => {
    try {
      loadInvoice(JSON.parse(content || '{}'));
      setIsSaved(false);
    } catch {}
  };

  const handleSave = async () => {
    const invoice = createInvoice();
    setExportUrl(await asDataURL(invoice));
    await save<Invoice>(invoice);
    setIsSaved(true);
  };

  const handleLoad = async () => {
    const invoice = await load<Invoice>();
    setExportUrl(await asDataURL(invoice));
    loadInvoice(invoice);
  };

  if (isFirstRender) {
    handleLoad();
  }

  return (
    <Container style={{ maxWidth: '48rem' }}>
      <Nav logo={logo} title={`${pkgDescription} v${pkgVersion}`}>
        <ButtonGroup className="flex-grow-1">
          <File icon="box-arrow-in-down" accept=".json,application/json" fullWidth onFileChange={handleImport}>
            Import
          </File>
          <Link href={exportUrl} download="invoice-generator-settings.json" icon="box-arrow-up" fullWidth>
            Export
          </Link>
          <Button icon="save2" disabled={isSaved} fullWidth onClick={handleSave}>
            Save
          </Button>
        </ButtonGroup>
      </Nav>

      <Row title="Supplier" icon="globe">
        <Col size={12}>
          <Input
            maxLength={200}
            placeholder="Description"
            value={supplierDescription}
            onChange={({ target }) => handleSupplierDescription(target.value)}
          />
        </Col>
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Address"
            value={supplierAddress}
            onChange={({ target }) => handleSupplierAddress(target.value)}
          />
        </Col>
      </Row>

      <Row title="Customer" icon="info-circle">
        <Col size={12}>
          <Input
            maxLength={200}
            placeholder="Description"
            value={customerDescription}
            onChange={({ target }) => handleCustomerDescription(target.value)}
          />
        </Col>
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Address"
            value={customerAddress}
            onChange={({ target }) => handleCustomerAddress(target.value)}
          />
        </Col>
      </Row>

      <Row title="Intermediary bank" icon="bank">
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Info"
            value={intermediaryBankInfo}
            onChange={({ target }) => handleIntermediaryBankInfo(target.value)}
          />
        </Col>
      </Row>

      <Row title="Bank" icon="bank2">
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Info"
            value={bankInfo}
            onChange={({ target }) => handleBankInfo(target.value)}
          />
        </Col>
      </Row>

      <Row title="Beneficiary" icon="person-check">
        <Col size={7}>
          <Input
            maxLength={200}
            placeholder="Name"
            value={beneficiaryName}
            onChange={({ target }) => handleBeneficiaryName(target.value)}
          />
        </Col>
        <Col size={5}>
          <Input
            maxLength={50}
            placeholder="IBAN"
            value={beneficiaryIBAN}
            onChange={({ target }) => handleBeneficiaryIBAN(target.value)}
          />
        </Col>
      </Row>

      <Row title="Service" icon="check-circle">
        <Col size={9}>
          <Input
            maxLength={200}
            placeholder="Description"
            value={serviceDescription}
            onChange={({ target }) => handleServiceDescription(target.value)}
          />
        </Col>
        <Col size={2} className="flex-fill">
          <Input
            type="number"
            min={0}
            max={999999}
            maxLength={10}
            placeholder="Value"
            value={serviceValue}
            onChange={({ target }) => handleServiceValue(target.value)}
          />
        </Col>
      </Row>

      <Row title="Configuration" icon="gear">
        <Col size={4}>
          <Input
            maxLength={10}
            placeholder={configurationDateFormat || DEFAULT_DATE_FORMAT}
            value={configurationDateFormat}
            onChange={({ target }) => handleConfigurationDateFormat(target.value)}
          />
        </Col>
        <Col size={4}>
          <Input
            maxLength={5}
            placeholder="en-US"
            value={configurationLocale}
            onChange={({ target }) => handleConfigurationLocale(target.value)}
          />
        </Col>
        <Col size={4}>
          <Input
            maxLength={3}
            placeholder="USD"
            value={configurationCurrency}
            onChange={({ target }) => handleConfigurationCurrency(target.value)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Options;
