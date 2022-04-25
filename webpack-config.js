const path = require('path')
// const ESLintPlugin = require('eslint-webpack-plugin')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

// const options = {
//   extensions: ['js', 'vue'],
//   exclude: [
//     'node_modules/',
//     'generated-stories-entry.js',
//     'storybook-init-framework-entry.js',
//     '.storybook'
//   ],
//   fix: true,
//   formatter: 'stylish',
//   threads: false
// }

module.exports = (cfg) => {
  cfg.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader'
  })
  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    '~': path.resolve(__dirname, 'src')
  }

  // cfg.plugins.push(
  //   new ESLintPlugin(options)
  // )

  // cfg.plugins.push(
  //   new NodePolyfillPlugin()
  // )

  cfg.module.rules.push({
    enforce: 'pre',
    // test: /\.(js|vue)$/,
    test: /\.(vue)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: {
      formatter: require('eslint').CLIEngine.getFormatter('stylish')
    }
  })

  return cfg
}
