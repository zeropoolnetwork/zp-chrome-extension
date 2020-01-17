const ExtensionReloader = require('webpack-extension-reloader');
const config = require('./custom-webpack.config');

module.exports = {
  ...config,
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new ExtensionReloader({
    reloadPage: true,
    entries: {
      background: 'background'
    }
  })],

  // Transform output to make naming the same as production build
  // https://github.com/angular/angular-cli/issues/15157
  output: {
    filename: '[name]-es2015.js',
    path: __dirname + '/dist'
  }
};
