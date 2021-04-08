module.exports = {
    extends: [
      'plugin:vue/recommended'
    ],
    rules: {
      "vue/no-unused-vars": "error",
      "vue/component-name-in-template-casing": ["error", "kebab-case", {
        "ignores": []
      }],
      "vue/html-self-closing": "off"
    }
  }