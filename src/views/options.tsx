import { useState } from 'react';
import { deepmerge as merge } from 'deepmerge-ts';

import { description as pkgDescription } from '../../package.json';

import { useIsFirstRender } from '../hooks/useIsFirstRender';
import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE, DEFAULT_CURRENCY, asDataURL, scrollToElement } from '../core/utils';
import { load, save } from '../core/storage';
import { Invoice, Service } from '../core/invoice';

import Container from '../components/Container';
import Nav from '../components/Nav';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import File from '../components/File';
import Link from '../components/Link';
import Row from '../components/Row';
import Col from '../components/Col';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Status from '../components/Status';

import logo from '../favicon.svg';

const Options = () => {
  const [invoice, setInvoice] = useState<Invoice>();
  const [exportUrl, setExportUrl] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const isFirstRender = useIsFirstRender();

  const updateInvoice = (argument: Invoice | Function) => {
    const isFunction = typeof argument === 'function';
    if (isFunction) {
      argument();
    }
    setInvoice(merge(invoice, isFunction ? {} : argument));
    setIsSaved(false);
  };

  const handleImport = (content?: string) => {
    try {
      setInvoice(JSON.parse(content || '{}'));
      setIsSaved(false);
    } catch {}
  };

  const isValidService = (service?: Service) => service && service?.description && service?.value;

  const handleSave = async () => {
    const savedInvoice = { ...invoice, services: invoice?.services?.filter((service) => isValidService(service)) };
    setInvoice(savedInvoice);
    setExportUrl(await asDataURL(savedInvoice));
    await save<Invoice>(savedInvoice || {});
    setIsSaved(true);
  };

  const hasServices = (services?: Service[]) => services && services?.length > 0;

  const canAddService = (services?: Service[]) => !hasServices(invoice?.services) || isValidService(services?.at(-1));

  const handleAddService = (service: Service) => {
    if (canAddService(invoice?.services)) {
      updateInvoice({ services: [service] });
      scrollToElement('last-service-description');
    }
  };

  const handleLoad = async () => {
    const loadedInvoice = await load<Invoice>();
    setInvoice(loadedInvoice);
    setExportUrl(await asDataURL(loadedInvoice));
  };

  if (isFirstRender) {
    handleLoad();
  }

  return (
    <Container style={{ maxWidth: '48rem' }}>
      <Nav logo={logo} title={`Options · ${pkgDescription}`}>
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
            value={invoice?.supplier?.description}
            onChange={({ target }) => updateInvoice({ supplier: { description: target.value } })}
          />
        </Col>
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Address"
            value={invoice?.supplier?.address}
            onChange={({ target }) => updateInvoice({ supplier: { address: target.value } })}
          />
        </Col>
      </Row>

      <Row title="Customer" icon="info-circle">
        <Col size={12}>
          <Input
            maxLength={200}
            placeholder="Description"
            value={invoice?.customer?.description}
            onChange={({ target }) => updateInvoice({ customer: { description: target.value } })}
          />
        </Col>
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Address"
            value={invoice?.customer?.address}
            onChange={({ target }) => updateInvoice({ customer: { address: target.value } })}
          />
        </Col>
      </Row>

      <Row title="Intermediary bank" icon="bank">
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Info"
            value={invoice?.intermediaryBank?.info}
            onChange={({ target }) => updateInvoice({ intermediaryBank: { info: target.value } })}
          />
        </Col>
      </Row>

      <Row title="Bank" icon="bank2">
        <Col size={12}>
          <TextArea
            maxLength={1000}
            rows={3}
            placeholder="Info"
            value={invoice?.bank?.info}
            onChange={({ target }) => updateInvoice({ bank: { info: target.value } })}
          />
        </Col>
      </Row>

      <Row title="Beneficiary" icon="person-check">
        <Col size={7}>
          <Input
            maxLength={200}
            placeholder="Name"
            value={invoice?.beneficiary?.name}
            onChange={({ target }) => updateInvoice({ beneficiary: { name: target.value } })}
          />
        </Col>
        <Col size={5}>
          <Input
            maxLength={50}
            placeholder="IBAN"
            value={invoice?.beneficiary?.iban}
            onChange={({ target }) => updateInvoice({ beneficiary: { iban: target.value } })}
          />
        </Col>
      </Row>

      <Row
        title="Services"
        icon="check-circle"
        extra={
          <Button icon="plus-circle" disabled={!canAddService(invoice?.services)} onClick={() => handleAddService({})}>
            Add service
          </Button>
        }
      >
        {hasServices(invoice?.services) ? (
          invoice?.services?.map((service, index, services) => (
            <>
              <Col size={9}>
                <Input
                  id={index === services.length - 1 ? 'last-service-description' : undefined}
                  maxLength={200}
                  placeholder="Description"
                  value={service?.description}
                  onChange={({ target }) =>
                    updateInvoice(() => (services[index] = { ...service, description: target.value }))
                  }
                />
              </Col>
              <Col size={2} className="flex-fill">
                <Input
                  type="number"
                  min={0}
                  max={999999}
                  maxLength={10}
                  placeholder="Value"
                  value={service?.value}
                  onChange={({ target }) =>
                    updateInvoice(() => (services[index] = { ...service, value: +target.value }))
                  }
                />
              </Col>
              <Col>
                <Button
                  icon="trash"
                  className="btn-danger"
                  onClick={() => updateInvoice(() => services.splice(index, 1))}
                />
              </Col>
            </>
          ))
        ) : (
          <Col>
            <Status className="text-secondary text-center" text="No services added" isInput />
          </Col>
        )}
      </Row>

      <Row title="Configuration" icon="gear">
        <Col size={4}>
          <Input
            maxLength={10}
            placeholder={invoice?.configuration?.dateFormat || DEFAULT_DATE_FORMAT}
            value={invoice?.configuration?.dateFormat}
            onChange={({ target }) => updateInvoice({ configuration: { dateFormat: target.value } })}
          />
        </Col>
        <Col size={4}>
          <Input
            maxLength={5}
            placeholder={invoice?.configuration?.locale || DEFAULT_LOCALE}
            value={invoice?.configuration?.locale}
            onChange={({ target }) => updateInvoice({ configuration: { locale: target.value } })}
          />
        </Col>
        <Col size={4}>
          <Input
            maxLength={3}
            placeholder={invoice?.configuration?.currency || DEFAULT_CURRENCY}
            value={invoice?.configuration?.currency}
            onChange={({ target }) => updateInvoice({ configuration: { currency: target.value } })}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Options;
