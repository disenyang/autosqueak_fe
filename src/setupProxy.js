const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { 
    target: 'http://xxx',
    pathRewrite: {
      '^/api': '',
    },
    changeOrigin: true,
    secure: false
  }));
  app.use(createProxyMiddleware('/client', {
      target: 'http://xxx',
      pathRewrite: {
        '^/client': '',
      },
      changeOrigin: true,
      secure: false
  }));
};