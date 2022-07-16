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

export interface DocumentLineOptions {
  dotted?: boolean;
  width?: number;
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

  #writeDottedLine(xFrom: number, yFrom: number, xTo: number, yTo: number, segmentLength: number = 1) {
    const a = Math.abs(xTo - xFrom);
    const b = Math.abs(yTo - yFrom);
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    const fractions = c / segmentLength;
    const adjustedSegmentLength =
      Math.floor(fractions) % 2 === 0 ? c / Math.ceil(fractions) : c / Math.floor(fractions);
    const deltaX = adjustedSegmentLength * (a / c);
    const deltaY = adjustedSegmentLength * (b / c);
    let curX = xFrom;
    let curY = yFrom;
    while (curX <= xTo && curY <= yTo) {
      this.#pdf.line(curX, curY, curX + deltaX, curY + deltaY);
      curX += 2 * deltaX;
      curY += 2 * deltaY;
    }
    return this;
  }

  setTitle(title: string) {
    this.#pdf.setDocumentProperties({ title });
    return this;
  }

  setAuthor(author: string) {
    this.#pdf.setDocumentProperties({ author });
    return this;
  }

  setCreator(creator: string) {
    this.#pdf.setDocumentProperties({ creator });
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

  writeText(text: string | string[], options?: DocumentTextOptions) {
    this.#pdf.text(text, this.#x, this.#y, options);
    return this;
  }

  breakText(text = '', options?: DocumentOptions) {
    this.writeText(text, options as TextOptionsLight);
    this.#breakLine(text, options);
    return this;
  }

  writeLine(options?: DocumentLineOptions) {
    this.#pdf.setLineWidth(options?.width || 0.200025);
    if (options?.dotted) {
      this.#writeDottedLine(this.#x, this.#y, this.width - this.#x, this.#y);
    } else {
      this.#pdf.line(this.#x, this.#y, this.width - this.#x, this.#y);
    }
    this.#breakLine();
    return this;
  }

  newPage() {
    this.#pdf.addPage();
    this.setXY(30, 30);
    return this;
  }

  focusPage(pageNumber: number) {
    this.#pdf.setPage(pageNumber);
    return this;
  }

  data() {
    return readAsDataURL(this.#pdf.output('blob'));
  }
}

export { Document };
