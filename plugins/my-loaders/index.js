module.exports = function(context, options) {
  return {
    name: 'loaders',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass'),
                  },
                },
                'postcss-loader'
              ],
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              exclude: /\.(mdx?)$/i,
              use: ['file-loader', { loader: 'image-webpack-loader' }],
            },
          ],
        },
      };
    },
  };
};
