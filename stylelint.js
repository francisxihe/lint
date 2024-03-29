module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
    "stylelint-config-prettier",
  ].map((key) => require.resolve(key)),
  plugins: [
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties",
  ].map((key) => require.resolve(key)),
  rules: {
    "no-descending-specificity": null,
    "declaration-colon-space-after": "always",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-trailing-semicolon": "always",
    //https://github.com/stylelint/stylelint/issues/4114
    "function-calc-no-invalid": null,
    "font-family-no-missing-generic-family-keyword": null, // iconfont
    "plugin/declaration-block-no-ignored-properties": true,
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
