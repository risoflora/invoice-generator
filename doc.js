import './third-party/jspdf.umd.min.js';

import { readAsDataURL } from './utils.js';

class Document {
  #pdf;
  #x;
  #y;

  constructor() {
    this.#pdf = new jspdf.jsPDF({ putOnlyUsedFonts: true, compress: true });
    this.height = this.#pdf.internal.pageSize.height || this.#pdf.internal.pageSize.getHeight();
    this.width = this.#pdf.internal.pageSize.width || this.#pdf.internal.pageSize.getWidth();
  }

  #getLineHeight(text = '') {
    const lineHeightOffset = 0.3;
    return this.#pdf.getLineHeight(text) / this.#pdf.internal.scaleFactor + lineHeightOffset;
  }

  #breakLine(text, options) {
    const lineHeight = this.#getLineHeight(text);
    if (options?.maxWidth) {
      const splittedText = this.#pdf.splitTextToSize(text, options.maxWidth);
      const lines = splittedText.length;
      const blockHeight = lines * lineHeight;
      this.#y += blockHeight;
    } else {
      this.#y += lineHeight;
    }
  }

  setTitle(title) {
    this.#pdf.setDocumentProperties({ title });
    return this;
  }

  setAuthor(author) {
    this.#pdf.setDocumentProperties({ author });
    return this;
  }

  setFont(options) {
    if (options) {
      this.#pdf.setFont(this.#pdf.getFont().fontName, options?.style || 'normal', options?.weight || 'normal');
      if (options?.size) {
        this.#pdf.setFontSize(options.size);
      }
      this.#pdf.setTextColor(options.color || 0);
    }
    return this;
  }

  setXY(x, y) {
    if (x) {
      this.#x = x;
    }
    if (y) {
      this.#y = y;
    }
    return this;
  }

  getXY() {
    return { x: this.#x, y: this.#y };
  }

  write(text, options) {
    this.#pdf.text(text, this.#x, this.#y, options);
    return this;
  }

  writeLine(text = '', options) {
    this.write(text, options);
    this.#breakLine(text, options);
    return this;
  }

  writeSeparator() {
    this.#pdf.line(this.#x, this.#y, this.width - this.#x, this.#y);
    this.#breakLine();
    return this;
  }

  data() {
    return readAsDataURL(this.#pdf.output('blob'));
  }
}

export { Document };
