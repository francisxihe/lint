const fs = require('fs');
const path = require('path');

const resolve = dir => {
  return path.resolve(process.cwd(), dir);
};

const defaultResolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
  alias: {
    '@': resolve('src'),
  },
};

const config = {
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    mocha: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  settings: {},
  plugins: ['@babel'],
  rules: {
    quotes: [
      0,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'operator-linebreak': [0, 'before'],
    'comma-dangle': [0, 'never'],
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 0,
    'arrow-parens': 0,
    camelcase: 0,
    'consistent-return': 0,
    'function-paren-newline': [2, 'consistent'], // 强制在函数括号内使用一致的换行,"consistent" 要求每个括号使用一致的换行。
    'linebreak-style': 0,
    'func-names': 0,
    'class-methods-use-this': 0,
    'max-len': [1, { code: 120, ignoreComments: true, ignoreStrings: true }],
    'max-lines': [1, { max: 500, skipBlankLines: true, skipComments: true }],
    'no-param-reassign': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-await-in-loop': 0,
    'no-extend-native': 0,
    'no-underscore-dangle': 0,
    'no-return-assign': 2,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 0 : 1,
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 0 : 1,
    'object-curly-newline': [
      2,
      {
        consistent: true,
      },
    ],
    'prefer-arrow-callback': 0,
    'prefer-destructuring': 0,
    'prefer-promise-reject-errors': 0,

    // todo babel-eslint报错
    // https://github.com/babel/babel-eslint/issues/681
    'template-curly-spacing': 0,
    indent: 0,

    'import/first': 0,
    'import/extensions': [
      0,
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow single export
    'import/prefer-default-export': 0,
  },
  globals: {
    lib: true,
  },
};

const vueConfigPaths = [resolve('vue.config.js'), resolve('build/vue.config.js')];
for (let file of vueConfigPaths) {
  if (fs.existsSync(file)) {
    // console.log('\x1b[32m%s\x1b[0m', '[@vision/eslint-config] vue config file detected: ' + file);
    const { configureWebpack: { resolve = defaultResolve, externals } = {} } = require(file);
    config.settings['import/resolver'] = {
      webpack: {
        config: { resolve, externals },
      },
    };
    break;
  }
}
const webpackConfigPaths = [resolve('webpack.config.js'), resolve('build/webpack.base.conf.js')];
if (!config.settings['import/resolver']) {
  for (let file of webpackConfigPaths) {
    if (fs.existsSync(file)) {
      console.log(
        '\x1b[32m%s\x1b[0m',
        '[@vision/eslint-config] webpack config file detected: ' + file,
      );
      const { resolve = defaultResolve, externals } = require(file);
      config.settings['import/resolver'] = {
        webpack: {
          config: { resolve, externals },
        },
      };
      break;
    }
  }
}
if (!config.settings['import/resolver']) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    `[@vision/eslint-config] Failed to find webpack config file, please config eslintConfig.settings['import/resolver'] yourself`,
  );
}

module.exports = config;
