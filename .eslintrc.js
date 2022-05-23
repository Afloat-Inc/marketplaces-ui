module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    'cypress/globals': true
  },
  // Rules order is important, please avoid shuffling them
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:storybook/recommended",
    "eslint:recommended",
    "plugin:cypress/recommended",
    '@vue/standard'
  ],
  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    "vue", // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    "cypress"
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
  ],
  globals: {
    ga: "readonly",
    // Google Analytics
    cordova: "readonly",
    __statics: "readonly",
    __QUASAR_SSR__: "readonly",
    __QUASAR_SSR_SERVER__: "readonly",
    __QUASAR_SSR_CLIENT__: "readonly",
    __QUASAR_SSR_PWA__: "readonly",
    process: true,
    Capacitor: "readonly",
    chrome: "readonly",
  },
  // add your custom rules here
  rules: {
    // allow async-await
    // 'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',
    // "vue/require-explicit-emits": 'off',
    "vue/custom-event-name-casing": 'off',
    "vue/component-tags-order": ["error", { "order": ["template", "script", "style"] }],
    "vue/no-multi-spaces": [
      "error",
      {
        ignoreProperties: false,
      },
    ],
    "indent": ["error", 2],
    "semi": [2, "never"],
    "no-else-return": 1,
    "consistent-return": 2,
    "space-before-blocks": [2, "always"],
    "space-infix-ops": [2, { int32Hint: false }],
    "arrow-spacing": [2, { before: true, after: true }],
    "key-spacing": [2, { beforeColon: false, afterColon: true }],
    "eqeqeq": [2, "smart"],
    "comma-dangle": [2, "never"],
    "no-trailing-spaces": [2, { skipBlankLines: false }],
    "quotes": [2, "single", { avoidEscape: true }],
    "keyword-spacing": [2, { before: true, after: true }],
    "block-spacing": [2, "always"],
    "brace-style": [1, "1tbs", { allowSingleLine: true }],
    "space-before-function-paren": ["error", "always"],

    // 'import/first': 'off',
    // 'import/named': 'error',
    // 'import/namespace': 'error',
    // 'import/default': 'error',
    // 'import/export': 'error',
    // 'import/extensions': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    "prefer-promise-reject-errors": "off",
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  overrides: [
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      rules: {
        // example of overriding a rule
        "storybook/hierarchy-separator": "error",
        // example of disabling a rule
        "storybook/default-exports": "off",
      },
    },
  ],
};
