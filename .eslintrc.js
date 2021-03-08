module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],

  plugins: ['eslint-plugin-import'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6
  },
  rules: {
    'no-var': 'warn',
    'prettier/prettier': 'warn',
    'arrow-body-style': 'error',
    'constructor-super': 'error',
    'guard-for-in': 'error',
    'id-blacklist': 'off',
    'id-match': 'off',
    'import/no-deprecated': 'warn',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'log',
          'dirxml',
          'warn',
          'error',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupCollapsed',
          'groupEnd',
          'table',
          'Console',
          'markTimeline',
          'profile',
          'profileEnd',
          'timeline',
          'timelineEnd',
          'timeStamp',
          'context'
        ]
      }
    ],
    'no-debugger': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-new-wrappers': 'error',

    'no-shadow': [
      'error',
      {
        hoist: 'all'
      }
    ],
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-labels': 'error',

    'prefer-const': 'error',
    'radix': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/']
      }
    ],
    indent: 'off'
  }
};
