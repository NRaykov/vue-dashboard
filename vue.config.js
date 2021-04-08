const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-dashboard/'
  : '/',
  lintOnSave: true,
  outputDir: path.resolve(__dirname, './docs'),
};