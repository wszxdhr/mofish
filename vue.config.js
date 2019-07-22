module.exports = {
  devServer: {
    port: 8908,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/style/base.scss";
        `
      }
    }
  }
}
