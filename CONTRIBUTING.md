[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## How to contribute

1. Ensure you have [nvm][nvm] and [node][node] installed in your machine
2. Ensure you have [yarn][yarn] installed in your machine
3. Nice to have [gh cli][ghcli]

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
