module.exports = {
  devServer: {
    port: 8908,
    proxy: {
      '/api': {
        target: 'http://localhost:8980/',
        changeOrigin: true
      },
      '/plugin': {
        target: 'http://localhost:8980/',
        changeOrigin: true
      }
    }
  }
}
