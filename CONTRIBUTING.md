[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![CI/CD](https://github.com/risoflora/invoice-generator/actions/workflows/CI.yml/badge.svg)](https://github.com/risoflora/invoice-generator/actions/workflows/CI.yml)
[![Publish](https://github.com/risoflora/invoice-generator/actions/workflows/publish.yml/badge.svg)](https://github.com/risoflora/invoice-generator/actions/workflows/publish.yml)

## How to contribute

1. Ensure you have [nvm][nvm] and [node][node] installed in your machine
2. Ensure you have [yarn][yarn] installed in your machine
3. Nice to have [gh cli][ghcli]
4. Follow the [Commit message format][commit-message-format] to commit your changes. You can use `yarn commit` to help you with that.

## Stack

*Libraries used in this project:*

- [Bootstrap][bootstrap-url]
- [jsPDF][jspdf-url]
- [React Datepicker][react-datepicker-url]

### Development

Install the dependencies

```bash
nvm use
yarn
```

Create another branch for your changes

```bash
git checkout -b my-feature
```

Run development environment

```bash
yarn dev
```

Commit your changes

```bash
git add .
yarn commit
```

### Build

To build the extension for production:

```bash
nvm use
yarn
yarn build
```

> *You **don't need** to do this, all build and publishings are done automatically.*


### Pushing changes

Create Pull Request

> You can use [gh cli](https://cli.github.com/) to create Pull Request
> `gh pr create --fill --web`

Once get approval, merge your changes



<!-- links -->

[nvm]: https://github.com/nvm-sh/nvm
[node]: https://nodejs.org/en/
[yarn]: https://classic.yarnpkg.com/en/
[ghcli]: https://cli.github.com/
[bootstrap-url]: https://github.com/twbs/bootstrap 'Bootstrap repository'
[jspdf-url]: https://github.com/parallax/jsPDF 'jsPDF repository'
[react-datepicker-url]: https://github.com/Hacker0x01/react-datepicker 'React Datepicker repository'
[commit-message-format]: https://semantic-release.gitbook.io/semantic-release/#commit-message-format
