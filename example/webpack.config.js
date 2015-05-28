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
      { test: /\.jsx$|\.es6$/, loader: 'babel-loader?stage=0' },
      { test: /\.scss$|\.css$/, loader: 'style-loader!style!css!sass' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' }
    ]
  },
  devtool: "eval-source-map"
};
