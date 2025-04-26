import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    env: {
      node: true,
      es2022: true,
      browser: true, // Make sure browser environment is recognized for React
    },
    extends: [
      'eslint:recommended',
      'google',
      'plugin:react/recommended', // Use recommended React linting rules
    ],
    parser: 'babel-eslint', // Use Babel parser for JSX syntax
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      'no-console': 'warn',
      'max-len': [
        'error',
        { 
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
        },
      ],
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'react/prop-types': 'off', // Optionally, you can turn off prop-types validation if using TypeScript or another approach
    },
  },
  {
    files: ['**/*.test.js'],
    env: {
      mocha: true,
    },
  },
  {
    files: ['**/*.jsx'],
    parserOptions: {
      ecmaVersion: 2020, // Support for JSX
      sourceType: 'module',
    },
  },
]);
