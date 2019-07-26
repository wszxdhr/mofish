module.exports = {
  devServer: {
    port: 8908,
    proxy: {
      '/api': {
        target: 'http://localhost:8900/',
        changeOrigin: true
      }
    }
  }
}
