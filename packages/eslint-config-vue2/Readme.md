# vue的eslint规则
``` bash
  # vue2
  yarn add @vision/eslint-config-vue -D
  # vue3
  yarn add @vision/eslint-config-vue@next -D
```

``` js
module.exports = {
  extends: ['@vision', '@vision/vue'],
  rules: {
    // your rules
  },
};
```
