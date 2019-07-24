module.exports = {
  devServer: {
    port: 8908,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/',
        changeOrigin: true
      }
    }
  }
}
