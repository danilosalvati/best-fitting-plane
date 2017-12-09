const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {

  let minimize = env && env.hasOwnProperty('minimize');

  let config = {
    entry: {
      BestFittingPlane: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
      path: path.join(__dirname, 'build-umd'),
      filename: `best-fitting-plane${minimize ? '.min' : ''}.js`,
      library: "BestFittingPlane",
      libraryTarget: "umd"
    },
    devtool: "source-map",
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }]
    },
    plugins: [],
  };

  if (minimize) config.plugins.push(new webpack.optimize.UglifyJsPlugin());

  return config;
};
