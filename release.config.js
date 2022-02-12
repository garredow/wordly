module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        publishCmd: 'cd build && zip -r ../Wordly_v${nextRelease.version}.zip * && cd ..',
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
