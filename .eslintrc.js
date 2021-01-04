module.exports = {
  plugins: ['jest'],
  env: {
    es6: true,
    "jest/globals": true
  },
  extends: [
    'airbnb-typescript/base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'no-template-curly-in-string': 'off'
  },
};
