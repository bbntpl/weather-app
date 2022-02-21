const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.common');
const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');

// doesn't erally work - just a reference in the future
const envConfig = process.env.MODE === 'development' ? devConfig : prodConfig;

module.exports = merge(commonConfig, envConfig);
