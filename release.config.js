module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'sh ./build.sh v${nextRelease.version}'
      }
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: './invoice-generator-v${nextRelease.version}.zip',
            label: 'Distribution Files.zip'
          }
        ]
      }
    ],
    [
      'semantic-release-chrome',
      {
        extensionId: 'obdabdocagpfclncklefebhhgggkbbnk',
        asset: 'invoice-generator-v${nextRelease.version}.zip'
      }
    ]
  ]
};
