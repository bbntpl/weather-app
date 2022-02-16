const { merge } = require('webpack-merge');

const commonConfig = require('./config/webpack.common');
const envConfig = process.env.MODE === 'production' ? require('./config/webpack.prod.js') : require('./config/webpack.dev.js');

module.exports = merge(commonConfig, envConfig);