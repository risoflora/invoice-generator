# `invoice-generator`

## Description

Invoice generator for Google Chrome and Microsoft Edge.

[![Screen shot 01][screenshot-01-url]][web-store-url]
[![Screen shot 02][screenshot-02-url]][web-store-url]

## Installation

Install this extension from **[Web Store][web-store-url]**.

[![Web Store][invoice-generator-logo-url]][web-store-url]

## Libraries

Libraries used in this project:

- [Bootstrap][bootstrap-url]
- [jsPDF][jspdf-url]
- [React Datepicker][react-datepicker-url]

## Build

To build the extension for production:

```bash
yarn
yarn build
```

and for development:

```bash
yarn
yarn dev
```

## Wish list

- [x] Vite support
- [x] Migration to React
- [x] Service/value customization per invoice
- [x] Export/import options
- [x] CI/CD
- [ ] Tests
- [ ] Multiple services
- [ ] Invoice reminder
- [ ] Invoice expression

[web-store-url]: https://chrome.google.com/webstore/detail/invoice-generator/obdabdocagpfclncklefebhhgggkbbnk 'Invoice generator Web Store'
[screenshot-01-url]: https://github.com/risoflora/invoice-generator/raw/master/contrib/screen-shot-1.png 'Invoice generator'
[screenshot-02-url]: https://github.com/risoflora/invoice-generator/raw/master/contrib/screen-shot-2.png 'Invoice generator options'
[invoice-generator-logo-url]: https://github.com/risoflora/invoice-generator/raw/master/contrib/logo.png 'Invoice generator logo'
[bootstrap-url]: https://github.com/twbs/bootstrap 'Bootstrap repository'
[jspdf-url]: https://github.com/parallax/jsPDF 'jsPDF repository'
[react-datepicker-url]: https://github.com/Hacker0x01/react-datepicker 'React Datepicker repository'
