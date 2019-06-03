module.exports = {
    // 输出文件目录
    outputDir: 'server/dist',
    devServer: {
        proxy: {//代理
          '/api': {
              target: 'http://localhost:3000/api',
              ws: true,
              changeOrigin: true,//是否跨域
              pathRewrite: {
                  '^/api' : ''// rewrite path
              }
          }
        }
    }
}