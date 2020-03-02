module.exports = {
  stories: ['../src/**/*.stories.(js|tsx|mdx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs/preset',
  ],
}
