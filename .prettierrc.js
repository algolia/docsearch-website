/* eslint-disable import/no-commonjs */
module.exports = {
  overrides: [
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        proseWrap: 'always',
      },
    },
  ],
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'es5',
};
