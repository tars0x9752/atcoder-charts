module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 0,
    'class-methods-use-this': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'max-len': [1, 120],
    'comma-dangle': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
