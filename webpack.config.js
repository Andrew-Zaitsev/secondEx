const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlagin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const PATHS = {
  pages: path.resolve(__dirname, './src/pages'),
}

const pathsToPages = fs.readdirSync(PATHS.pages).map((folder) => path.resolve(PATHS.pages, folder));
const PAGES_PUGS = pathsToPages
  .map((pathToPage) => fs.readdirSync(pathToPage)
    .map((fileName) => path.resolve(pathToPage, fileName))
    .filter((pathToFile) => pathToFile.endsWith('.pug'))
  )
  .flat();

const htmlPlugins = [
  ...PAGES_PUGS
    .map(
      (filePath) => {
        return new HtmlWebpackPlugin(
          {
            template: filePath,
            filename: path.parse(filePath).name + '.html',
            minify: false,
            minimize: false
          });
      }
    )
]

// stop();

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
  const config = {
    minimize: false,
    runtimeChunk: 'single', // без этого куска открытое окно не обновляется сервером
    splitChunks: {
      cacheGroups: { // собрать все css в один выходной файл
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  };
  
  return config;
};

const filename =  (ext) => `[name].${ext}`; // (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash:2].${ext}`);

const cssLoaders = (addition) => {

  const loaders = ['css-loader'];
  const loaderMCEP = { 
    loader: MiniCssExtractPlagin.loader,
    options: {
      esModule: false,
    },
  };

  if (isDev) {
    loaders.unshift('style-loader')
  } else {
    loaders.unshift(loaderMCEP)
  };
  if (addition) loaders.push(addition);
  
  return loaders;
};


module.exports = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: path.resolve(__dirname, './src/pages/index', './index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  
  resolve: {
    extensions: ['.ts','.js'],
  },
  
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
    open: 'Google Chrome',
  },
  devtool: isDev ? 'source-map' : false,
  target: 'web',
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlagin({
      filename: 'assets/css/' + filename('css'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
        //use: ['fileName-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',//'asset/inline',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
        //use: ['fileName-loader'],
      },
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
        exclude: '/node_modules/',
      },
    ],
  },
}