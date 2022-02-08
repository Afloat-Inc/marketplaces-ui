module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports

  },
  env: {
    browser: true
  },
  // Rules order is important, please avoid shuffling them
  extends: ["plugin:vue/vue3-essential", "prettier", "plugin:storybook/recommended"],
  plugins: [// https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
  // required to lint *.vue files
  'vue' // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
  // Prettier has not been included as plugin to avoid performance impact
  // add it as an extension for your IDE
  ],
  globals: {
    ga: 'readonly',
    // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },
  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};