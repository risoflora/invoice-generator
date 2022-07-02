import { TextOptionsLight } from 'jspdf';

import { DEFAULT_LOCALE, DEFAULT_CURRENCY, formatDate, formatMonth, formatNamedDate, formatMoney } from './utils';
import { Invoice } from './invoice';
import { Document } from './doc';

const MAX_COL_WIDTH = 68;

export interface ReportOptions {
  referenceMonth: Date;
  dueOn?: Date;
}

class Report {
  #doc;
  #invoice;
  #id?: string;
  #date!: Date;
  #dueOn?: Date;
  #referenceMonth!: Date;

  constructor(invoice: Invoice) {
    this.#doc = new Document();
    this.#invoice = invoice;
  }

  #generateDocumentProperties(title: string) {
    const { supplier } = this.#invoice;
    this.#doc.setTitle(`${title}`).setAuthor(`${supplier?.description}`);
  }

  #generatePropsAndHeaderInfo() {
    const options: TextOptionsLight = { align: 'right' };
    const { configuration } = this.#invoice;
    const title = `INVOICE FOR ${formatDate(this.#date, configuration.dateFormat)}`;

    this.#generateDocumentProperties(title);

    this.#doc.setFont({ weight: 'bold', size: 16 }).setXY(this.#doc.width - 30, 30);
    this.#doc.writeLine(title, options);

    this.#doc.setFont({ weight: 'normal', size: 7, color: 100 });
    this.#doc.write(`ID: ${this.#id}`, options);
  }

  #generateCompaniesInfo() {
    const { supplier, customer } = this.#invoice;
    const options = { maxWidth: MAX_COL_WIDTH };

    this.#doc.setFont({ weight: 'bold', size: 9 }).setXY(30, 60);
    this.#doc.writeLine('SUPPLIER').writeLine();
    this.#doc.writeLine(supplier?.description, options);
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(supplier?.address, options);

    this.#doc.setFont({ weight: 'bold' }).setXY(110, 60);
    this.#doc.writeLine('CUSTOMER').writeLine();
    this.#doc.writeLine(customer?.description, options);
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(customer?.address, options);
  }

  #generateBanksInfo() {
    const { intermediaryBank, bank, beneficiary } = this.#invoice;
    const options = { maxWidth: MAX_COL_WIDTH };

    this.#doc.setFont({ weight: 'bold' }).setXY(30, 90);
    if (intermediaryBank?.info) {
      this.#doc.writeLine('INTERMEDIARY BANK').writeLine();
      this.#doc.setFont({ weight: 'normal' });
      this.#doc.writeLine(intermediaryBank?.info, options);
      this.#doc.setFont({ weight: 'bold' }).writeLine();
    }

    this.#doc.writeLine('BANK').writeLine();
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(bank?.info, options);

    this.#doc.setFont({ weight: 'bold' }).writeLine();
    this.#doc.writeLine('BENEFICIARY').writeLine();
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(beneficiary?.name);
    if (beneficiary?.iban) {
      this.#doc.writeLine(`IBAN: ${beneficiary.iban}`);
    }
    this.#doc.writeLine();
  }

  #generateServiceInfo() {
    const { service, configuration } = this.#invoice;
    const locale = configuration?.locale || DEFAULT_LOCALE;
    const options = { align: 'right' };
    const year = new Date().getFullYear();

    this.#doc.setFont({ weight: 'bold' }).writeLine();
    this.#doc.writeLine('SERVICE').writeLine();
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(
      `${service?.description || ''} referring to ${formatMonth(this.#referenceMonth, locale)} ${year}`
    );

    this.#doc.setFont({ weight: 'bold' }).setXY(30).writeLine();
    this.#doc.writeLine('TOTAL');

    this.#doc.writeSeparator();

    this.#doc.setFont({ weight: 'bold', size: 10 }).setXY(this.#doc.width - this.#doc.getXY().x);
    this.#doc.writeLine(
      formatMoney(Number(service?.value), configuration?.currency || DEFAULT_CURRENCY, locale),
      options
    );
  }

  #generateDatesInfo() {
    const { configuration } = this.#invoice;
    const locale = configuration?.locale || DEFAULT_LOCALE;
    const options: TextOptionsLight = { align: 'right' };

    this.#doc.setFont({ weight: 'normal' }).setXY(126, this.#doc.height / 2 - 40);
    this.#doc.write('Issued on:', options);
    this.#doc.setXY(150);
    this.#doc.writeLine(formatNamedDate(this.#date, locale), options);

    if (this.#dueOn) {
      this.#doc.setXY(126);
      this.#doc.write('Due on:', options);
      this.#doc.setXY(150);
      this.#doc.writeLine(formatNamedDate(this.#dueOn, locale), options);
    }
  }

  async generate({ referenceMonth, dueOn }: ReportOptions): Promise<chrome.downloads.DownloadOptions> {
    this.#id = crypto.randomUUID();
    this.#date = new Date();
    this.#referenceMonth = referenceMonth;
    this.#dueOn = dueOn;

    this.#generatePropsAndHeaderInfo();
    this.#generateCompaniesInfo();
    this.#generateBanksInfo();
    this.#generateServiceInfo();
    this.#generateDatesInfo();

    return { url: await this.#doc.data(), filename: `Invoice-${this.#id}.pdf` };
  }
}

export { Report };
