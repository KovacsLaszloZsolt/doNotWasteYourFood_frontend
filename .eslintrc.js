module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:security/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    camelcase: 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    'security/detect-unsafe-regex': 'off',
    'security/detect-object-injection': 'off',
    'no-return-await': 'error',
    'no-control-regex': 'off',
    'no-case-declarations': 'off',
    'object-curly-spacing': [1, 'always'],
    'no-multiple-empty-lines': [1, { max: 1 }],
    'no-console': 1,
    'no-trailing-spaces': 'error',
    'max-len': [1, { code: 120, tabWidth: 2, ignoreStrings: true, ignoreComments: true }],
    'no-duplicate-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: 'function', next: '*' }
    ]
  },
  settings: {
    'import/ignore': ['node_modules/react-native/index\\.js$']
  }
};
