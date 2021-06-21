module.exports = {
  pages: {
    index: {
      entry: 'vue/main.js'
    }
  },
  outputDir: 'static',
  publicPath: '/static',
  devServer: {
    writeToDisk: true
  }
}
