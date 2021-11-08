module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'airbnb-base'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {},
  settings: {
    'import/core-modules': ['vue', 'vuex'] // these modules are included in nuxt.js
  }
}
