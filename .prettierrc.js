module.exports = {
  overrides: [
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 80,
        proseWrap: 'always',
        singleQuote: true,
        trailingComma: 'es5',
      },
    },
  ],
  singleQuote: true,
  trailingComma: 'es5',
};
