import { useEffect, useState } from 'react';

import { description as pkgDescription, version as pkgVersion } from '../../package.json';

import { useIsFirstRender } from '../hooks/useIsFirstRender';
import { daysBetween, isSameDate } from '../core/utils';
import { load } from '../core/storage';
import { Invoice } from '../core/invoice';
import { Report, ReportOptions } from '../core/report';

import Container from '../components/Container';
import Hero from '../components/Hero';
import Row from '../components/Row';
import Col from '../components/Col';
import DatePicker from '../components/DatePicker';
import Status from '../components/Status';
import Input from '../components/Input';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import RateUs from '../components/RateUs';

import logo from '../favicon.svg';

const Popup = () => {
  const [referenceMonth, setReferenceMonth] = useState(new Date());
  const [dueOn, setDueOn] = useState<Date>();
  const [remainingDays, setRemainingDays] = useState<string>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  const [serviceValue, setServiceValue] = useState<string>();
  const isFirstRender = useIsFirstRender();

  const hasDates = () => referenceMonth && dueOn;

  const generate = async (options: ReportOptions) => {
    const invoice = await load<Invoice>();
    chrome.downloads.download(
      await new Report({
        ...invoice,
        service: { ...invoice.service, description: serviceDescription, value: serviceValue }
      }).generate(options)
    );
  };

  const handleReferenceMonth = (date: Date) => {
    setReferenceMonth(date);
    setDueOn(undefined);
  };

  const handleDueOn = (date: Date) => setDueOn(date);

  const handleSettings = () => chrome.runtime.openOptionsPage();

  const handleGenerate = () => generate({ referenceMonth, dueOn });

  useEffect(() => {
    if (hasDates() && !isSameDate(dueOn!, referenceMonth)) {
      const days = daysBetween(referenceMonth, dueOn!);
      setRemainingDays(days > 0 ? `Is due on ${days} day${days > 1 ? 's' : ''}` : '');
    } else {
      setRemainingDays('');
    }
    if (isFirstRender) {
      load<Invoice>().then(({ service }) => {
        setServiceDescription(service?.description);
        setServiceValue(service?.value);
      });
    }
  }, [referenceMonth, dueOn]);

  return (
    <Container style={{ width: '18rem' }}>
      <Hero logo={logo}>
        {pkgDescription} v{pkgVersion}
      </Hero>
      <Row title="Reference / Due on" icon="calendar-range">
        <Col>
          <DatePicker selected={referenceMonth} minDate={new Date()} required onChange={handleReferenceMonth} />
        </Col>
        <Col>
          <DatePicker
            selected={dueOn}
            minDate={referenceMonth}
            disabled={!referenceMonth}
            required
            onChange={handleDueOn}
          />
        </Col>
        <Status text={remainingDays} />
      </Row>

      <Row title="Service" icon="check-circle">
        <Col size={8}>
          <Input
            maxLength={200}
            placeholder="Description"
            value={serviceDescription}
            onChange={({ target }) => setServiceDescription(target.value)}
          />
        </Col>
        <Col size={4}>
          <Input
            type="number"
            min={0}
            max={999999}
            maxLength={10}
            placeholder="Value"
            value={serviceValue}
            onChange={({ target }) => setServiceValue(target.value)}
          />
        </Col>
      </Row>

      <ButtonGroup>
        <Button icon="gear" onClick={handleSettings}>
          Settings
        </Button>
        <Button icon="filetype-pdf" onClick={handleGenerate}>
          Generate
        </Button>
      </ButtonGroup>

      <RateUs />
    </Container>
  );
};

export default Popup;
