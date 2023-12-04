const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/frontend/index.ts'),
  output: {
    path: path.resolve(__dirname, './build/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(d.ts|ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: [ '.d.ts', '.ts', '.tsx', '.js', '.jsx' ]
  },
  devtool : 'source-map',
};
