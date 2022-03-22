import { formatDate, formatNamedDate, formatMoney } from './utils.js';
import { Document } from './doc.js';

const MAX_COL_WIDTH = 68;

class Report {
  #doc;
  #invoice;
  #id;
  #date;
  #referenceMonth;

  constructor(invoice) {
    this.#doc = new Document();
    this.#invoice = invoice;
  }

  #generateDocumentProperties(title) {
    const { supplier } = this.#invoice;
    this.#doc.setTitle(`${title}`).setAuthor(`${supplier?.description}`);
  }

  #generatePropsAndHeaderInfo() {
    const options = { align: 'right' };
    const title = `INVOICE ${formatDate(this.#date)}`;

    this.#generateDocumentProperties(title);

    this.#doc.setFont({ weight: 'bold', size: 16 }).setXY(this.#doc.width - 30, 30);
    this.#doc.writeLine(title, options);

    this.#doc.setFont({ weight: 'normal', size: 7, color: 100 });
    this.#doc.write(`ID: ${this.#id}`, options);
  }

  #generateCompaniesInfo() {
    const { supplier, customer } = this.#invoice;
    const options = { maxWidth: MAX_COL_WIDTH };

    this.#doc.setFont({ weight: 'bold', size: 9 }).setXY(30, 80);
    this.#doc.writeLine('SUPPLIER').writeLine();
    this.#doc.writeLine(supplier?.description, options);
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(supplier?.address, options);

    this.#doc.setFont({ weight: 'bold' }).setXY(110, 80);
    this.#doc.writeLine('CUSTOMER').writeLine();
    this.#doc.writeLine(customer?.description, options);
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(customer?.address, options);
  }

  #generateBanksInfo() {
    const { intermediaryBank, bank, beneficiary } = this.#invoice;
    const options = { maxWidth: MAX_COL_WIDTH };

    this.#doc.setFont({ weight: 'bold' }).setXY(30, 130);
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
  }

  #generateDatesInfo() {
    const options = { align: 'right' };

    this.#doc.setXY(110, this.#doc.height / 2);
    this.#doc.write('Issued on:');
    this.#doc.setXY(150);
    this.#doc.writeLine(formatNamedDate(this.#date), options);

    const nextDate = new Date(this.#date);
    const tenDays = 10;
    nextDate.setDate(nextDate.getDate() + tenDays);
    this.#doc.setXY(110);
    this.#doc.write('Due on:');
    this.#doc.setXY(150);
    this.#doc.writeLine(formatNamedDate(nextDate), options);
  }

  #generateServiceInfo() {
    const { service } = this.#invoice;
    const options = { align: 'right' };
    const year = new Date().getFullYear();

    this.#doc.setFont({ weight: 'bold' }).setXY(30, this.#doc.height - 60);
    this.#doc.writeLine('SERVICE').writeLine();
    this.#doc.setFont({ weight: 'normal' });
    this.#doc.writeLine(`${service?.description} referring to ${this.#referenceMonth} ${year}`);

    this.#doc.setFont({ weight: 'bold' }).setXY(30, this.#doc.height - 40);
    this.#doc.writeLine('TOTAL');

    this.#doc.writeSeparator();

    this.#doc.setFont({ weight: 'bold', size: 10 }).setXY(this.#doc.width - this.#doc.getXY().x);
    this.#doc.writeLine(
      formatMoney(service?.locale || 'en-US', service?.currency || 'USD', Number(service?.value).toFixed(2)),
      options
    );
  }

  async generate(referenceMonth) {
    this.#id = crypto.randomUUID();
    this.#date = new Date();
    this.#referenceMonth = referenceMonth;

    this.#generatePropsAndHeaderInfo();
    this.#generateCompaniesInfo();
    this.#generateBanksInfo();
    this.#generateDatesInfo();
    this.#generateServiceInfo();

    return { url: await this.#doc.data(), filename: `Invoice-${this.#id}.pdf` };
  }
}

export { Report };
