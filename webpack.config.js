const path = require('path');

const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.js', '.ts']
  },
  mode: 'development',
  output: {
    path: outDir,
    filename: 'overseer.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
    ]
  },
  externals: {
    // lodash: {
    //   commonjs: 'lodash',
    //   commonjs2: 'lodash',
    //   amd: 'lodash',
    //   root: '_'
    // }
  }
};
