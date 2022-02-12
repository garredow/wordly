module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        publishCmd: 'zip -r Wordly_v${nextRelease.version}.zip build/*',
      },
    ],
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false,
        assets: [
          {
            path: 'Wordly_v*.zip',
          },
        ],
      },
    ],
    '@semantic-release/git',
  ],
};
