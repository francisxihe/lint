#! /usr/bin/env node

const distTag = process.env.npm_config_tag || 'latest';

// if (distTag === 'latest') {
//   // console.log(chalk.red('你不能在此分支发布正式版，设置 --tag'));
//   // process.exit(1);
//   throw new Error('你不能在此分支发布正式版，设置 --tag');
// }
