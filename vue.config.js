module.exports = {
  devServer: {
    port: 20313,
    proxy: 'http://localhost:20310'
  },
  lintOnSave: false
}
