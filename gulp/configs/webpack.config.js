const path = require('path');
const webpack = require('webpack-stream').webpack;
const config = require('./config');

//convert path array to path object
var entries, filename, i;
  entries = {};

for (i = 0; i < config.input.entry.length; i++){
  name = config.input.entry[i].replace(/^.*[\\\/]/, '');
  name = name.substring(0, name.length - 3);
  entries[name] = config.input.entry[i];
}

module.exports = {
  devtool: 'source-map', //cheap-module-inline-source-map
  entry: entries,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map'
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },

  plugins: [

    //dont save file if build fails
    new webpack.NoErrorsPlugin()

  ]
};
