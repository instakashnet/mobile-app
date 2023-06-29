module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: ['react', 'react-native', 'react-hooks'],
  extends: ['universe/native', 'plugin:react-hooks/recommended', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-unused-expressions': 'warn',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
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
