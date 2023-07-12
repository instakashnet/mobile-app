module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: ['react', 'react-native', 'react-hooks', 'simple-import-sort'],
  extends: ['universe/native', 'plugin:react-hooks/recommended', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-unused-expressions': 'warn',
    indent: ['warn', 2, { SwitchCase: 1 }],
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
