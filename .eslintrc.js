module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'semi': 'off',
    'quotes': 'off',
    'indent': 'off',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
  },
  overrides: [
    {
      files: ['cypress/**/*.js'],
      env: {
        'cypress/globals': true,
      },
    },
  ],
};
