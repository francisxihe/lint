# @vision/rules

一个包含 prettier，eslint，stylelint，commitlint 的配置文件合集

# 接入
// 跑全局
npx eslint src/**/*.{vue,js} —fix
npx stylelint src/**/*.{vue,scss,css} —fix

# Use

in `.eslintrc.js`

```js
module.exports = {
  root: true,
  extends: ["@vision/eslint-config", "@vision/eslint-config-vue"],
  rules: {
    quotes: [
      0,
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
};
```

in `.stylelintrc.js`

```js
module.exports = {
  extends: [require.resolve('@vision/rules/stylelint')],
  rules: {
    // your rules
  },
};

```

in `.prettierrc.js`

```js
module.exports = require('@vision/rules/prettier');
```
 
in `commitlint.config.js`

```js
module.exports = require('@vision/rules/commitlint');
```
in package.json
```json
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -Ve"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,vue}": [
      "eslint --ext .tsx,.ts --fix ./src",
      "prettier --write"
    ]
  }
```
# TODO
- [x] 适配vue/cli工程（主要是[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import/blob/master/resolvers/webpack/index.js)，最好内部可以写一些逻辑找到配置文件）
