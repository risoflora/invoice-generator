import { useEffect, useState } from 'react';

import { description as pkgDescription, version as pkgVersion } from '../../package.json';

import { DEFAULT_DATE_FORMAT, daysBetween, formatMoney, isSameDate, totalize } from '../core/utils';
import { load } from '../core/storage';
import { Invoice } from '../core/invoice';
import { Report, ReportOptions } from '../core/report';

import Container from '../components/Container';
import Hero from '../components/Hero';
import Row from '../components/Row';
import Accordion from '../components/Accordion';
import AccordionItem from '../components/AccordionItem';
import Col from '../components/Col';
import DatePicker from '../components/DatePicker';
import Status from '../components/Status';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import List from '../components/List';
import ListItem from '../components/ListItem';
import RateUs from '../components/RateUs';

import logo from '../favicon.svg';

const Popup = () => {
  const [invoice, setInvoice] = useState<Invoice>({});
  const [referenceMonth, setReferenceMonth] = useState(new Date());
  const [dueOn, setDueOn] = useState<Date>();
  const [remainingDaysStatus, setRemainingDaysStatus] = useState<string>();

  const generate = async (options: ReportOptions) =>
    chrome.downloads.download(await new Report(invoice).generate(options));

  const handleReferenceMonth = (date: Date) => {
    setReferenceMonth(date);
    setDueOn(undefined);
  };

  const handleDueOn = (date: Date) => setDueOn(date);

  const handleOptions = () => chrome.runtime.openOptionsPage();

  const handleGenerate = () => generate({ referenceMonth, dueOn });

  useEffect(() => {
    if (referenceMonth && dueOn && !isSameDate(dueOn, referenceMonth)) {
      const days = daysBetween(referenceMonth, dueOn);
      setRemainingDaysStatus(days > 0 ? `Is due on ${days} day${days > 1 ? 's' : ''}` : '');
    } else {
      setRemainingDaysStatus('');
    }
  }, [referenceMonth, dueOn]);

  useEffect(() => {
    (async () => setInvoice(await load<Invoice>()))();
  }, [load]);

  return (
    <Container style={{ width: '18rem' }}>
      <Hero logo={logo}>
        {pkgDescription} v{pkgVersion}
      </Hero>
      <Row title="Reference / Due on" icon="calendar-range">
        <Col>
          <DatePicker
            selected={referenceMonth}
            minDate={new Date()}
            dateFormat={invoice.configuration?.dateFormat}
            placeholder={invoice.configuration?.dateFormat || DEFAULT_DATE_FORMAT}
            required
            onChange={handleReferenceMonth}
          />
        </Col>
        <Col>
          <DatePicker
            selected={dueOn}
            minDate={referenceMonth}
            disabled={!referenceMonth}
            dateFormat={invoice.configuration?.dateFormat}
            placeholder={invoice.configuration?.dateFormat || DEFAULT_DATE_FORMAT}
            required
            onChange={handleDueOn}
          />
        </Col>
        <Status text={remainingDaysStatus} />
      </Row>

      <Row title="Services" icon="check-circle">
        <Accordion id="accordion-service">
          <AccordionItem
            ownerSelector="#accordion-service"
            title="Items"
            titleClassName="px-2 py-1"
            bodyClassName="px-1 py-2"
          >
            <List className="rounded" style={{ maxHeight: '15rem', overflowY: 'scroll' }}>
              {invoice?.services?.map((service, index) => (
                <ListItem key={index} className="d-flex justify-content-between p-0" title={service?.description}>
                  <small className="fw-bold text-success ms-1">
                    {formatMoney(service?.value || 0, '', invoice?.configuration?.locale)}
                  </small>
                </ListItem>
              ))}
            </List>
          </AccordionItem>
          <AccordionItem
            ownerSelector="#accordion-service"
            title="Total"
            titleClassName="px-2 py-1"
            bodyClassName="px-2 py-1"
            expanded
          >
            <div className="fw-bold text-success text-end">
              {formatMoney(
                totalize((service) => service.value, invoice?.services),
                invoice?.configuration?.currency,
                invoice?.configuration?.locale
              )}
            </div>
          </AccordionItem>
        </Accordion>
      </Row>

      <ButtonGroup>
        <Button icon="gear" fullWidth onClick={handleOptions}>
          Options
        </Button>
        <Button icon="filetype-pdf" fullWidth onClick={handleGenerate}>
          Generate
        </Button>
      </ButtonGroup>

      <RateUs />
    </Container>
  );
};

export default Popup;
