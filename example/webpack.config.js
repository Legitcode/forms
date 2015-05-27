module.exports = {
  entry: {'basic': './example/basic.jsx'},
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map',
    assetPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.jsx$|\.es6$/, loader: 'babel-loader?stage=0' }
    ]
  },
  devtool: "eval-source-map"
};
