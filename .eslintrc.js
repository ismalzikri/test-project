module.exports = {
  root: false,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Best Practices
    'eqeqeq': 'error',
    'no-invalid-this': 'error',
    'no-return-assign': 'error',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-mutating-props': 'off',

    // Variable
    'init-declarations': 'error',
    'no-use-before-define': 'error',

    // Stylistic Issues
    'array-bracket-newline': ['error', { multiline: true, minItems: null }],
    'array-bracket-spacing': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'block-spacing': 'error',
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'func-call-spacing': 'error',
    'implicit-arrow-linebreak': ['error', 'beside'],
    // 'indent': ['error', 2],
    'keyword-spacing': 'error',
    'multiline-ternary': ['error', 'never'],
    'no-lonely-if': 'error',
    'no-mixed-operators': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-tabs': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true }
    ],
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'semi-spacing': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error',
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',

    // ES6
    'arrow-spacing': 'error',
    'no-confusing-arrow': 'error',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',

    // Vue
    'vue/html-quotes': ['error', 'double'],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: true
      }
    ],

    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['*']
      }
    ],

    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 0,
        ignores: []
      }
    ],
    'vue/no-multi-spaces': [
      'error',
      {
        ignoreProperties: false
      }
    ],
    'vue/no-v-html': 0
  }
}
