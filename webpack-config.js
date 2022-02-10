const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

const options = {
  extensions: [`js`, `vue`],
  exclude: [
    'node_modules/',
    '.storybook'
  ],
  fix: true,
  formatter: 'stylish',
  threads: false
}

module.exports = (cfg) => {
  cfg.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader'
  })
  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    '~': path.resolve(__dirname, 'src')
  }

  cfg.plugins.push(
    new ESLintPlugin(options)
  )

  return cfg
}
