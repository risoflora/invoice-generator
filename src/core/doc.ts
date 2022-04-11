import jsPDF, { TextOptionsLight } from 'jspdf';

import { readAsDataURL } from './utils';

export interface DocumentOptions {
  style?: string;
  size?: number;
  weight?: string | number;
  maxWidth?: number;
  color?: number;
  align?: string;
}

export type DocumentTextOptions = TextOptionsLight;

class Document {
  #pdf;
  #x!: number;
  #y!: number;
  height: number;
  width: number;

  constructor() {
    this.#pdf = new jsPDF({ putOnlyUsedFonts: true, compress: true });
    this.height = this.#pdf.internal.pageSize.height || this.#pdf.internal.pageSize.getHeight();
    this.width = this.#pdf.internal.pageSize.width || this.#pdf.internal.pageSize.getWidth();
  }

  #getLineHeight() {
    const lineHeightOffset = 0.3;
    return this.#pdf.getLineHeight() / this.#pdf.internal.scaleFactor + lineHeightOffset;
  }

  #breakLine(text = '', options?: DocumentOptions) {
    const lineHeight = this.#getLineHeight();
    if (options?.maxWidth) {
      const splittedText = this.#pdf.splitTextToSize(text, options.maxWidth);
      const lines = splittedText.length;
      const blockHeight = lines * lineHeight;
      this.#y += blockHeight;
    } else {
      this.#y += lineHeight;
    }
  }

  setTitle(title: string) {
    this.#pdf.setDocumentProperties({ title });
    return this;
  }

  setAuthor(author: string) {
    this.#pdf.setDocumentProperties({ author });
    return this;
  }

  setFont(options: DocumentOptions) {
    if (options) {
      this.#pdf.setFont(this.#pdf.getFont().fontName, options?.style || 'normal', options?.weight || 'normal');
      if (options?.size) {
        this.#pdf.setFontSize(options.size);
      }
      this.#pdf.setTextColor(options?.color || 0);
    }
    return this;
  }

  setXY(x: number, y?: number) {
    this.#x = x;
    if (y) {
      this.#y = y;
    }
    return this;
  }

  getXY() {
    return { x: this.#x, y: this.#y };
  }

  write(text: string | string[], options?: DocumentTextOptions) {
    this.#pdf.text(text, this.#x, this.#y, options);
    return this;
  }

  writeLine(text = '', options?: DocumentOptions) {
    this.write(text, options as TextOptionsLight);
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
