module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'prettier',
    'prettier/react',
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // allow .js files to contain JSX code
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // prevent eslint to complain about the "styles" variable being used before it was defined
    // "no-use-before-define": ["error", { "variables": false }],

    // ignore errors for the react-navigation package
    'react/prop-types': [
      'error',
      { ignore: ['navigation', 'navigation.navigate'] },
    ],
  },
};
