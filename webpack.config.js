const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const BUILD_DIR = path.resolve(__dirname, 'public/js');
const APP_DIR = path.resolve(__dirname, 'public/js');


module.exports = {
  entry: APP_DIR + '/main.tsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
      }
      ,
      {
        test: /\.jsx?/,
        include: [APP_DIR, APP_DIR + '/comp'],
        loader: 'babel'
      }
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};