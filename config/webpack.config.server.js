const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = function () {
  return {
    mode: 'production',
    entry: 'paths.ssrIndexJs',
    target: 'node',
    output: {
      path: paths.ssrBuild,
      filename: 'server.js',
      chunkFilename: 'js/[name].chunk.js',
      publicPath: paths.publicUrlOrPath,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: 'automatic',
                    },
                  ],
                ],

                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: false,
              },
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: {
                  exportOnlyLocals: true,
                },
              },
            },
            {
              test: cssModuleRegex,
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: {
                  exportOnlyLocals: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 3,
                    modules: {
                      exportOnlyLocals: true,
                    },
                  },
                },
                require.resolve('sass-loader'),
              ],
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 3,
                    modules: {
                      exportOnlyLocals: true,
                      getLocalIdent: getCSSModuleLocalIdent,
                    },
                  },
                },
                require.resolve('sass-loader'),
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('resolve-url-loader'),
              options: {
                emitFile: false,
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              loader: require.resolve('file-loader'),
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                emitFile: false,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
    },
    externals: [
      nodeExternals({
        allowlist: [/@babel/],
      }),
    ],
    plugins: [new webpack.DefinePlugin(env.stringified)],
  };
};
