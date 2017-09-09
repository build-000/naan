//webpack.dist.config.js

var CopyWebpackPlugin = require('copy-webpack-plugin');

config.plugins = config.plugins.concat([
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'src/assets' }
  ]),
]);