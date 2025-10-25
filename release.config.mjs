/* eslint-disable no-template-curly-in-string */
/**
 * @type {import('semantic-release').Options}
 */
export default {
  tagFormat: 'v${version}',
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore: bump version to ${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
  ],
};
