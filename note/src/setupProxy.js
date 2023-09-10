const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );

  app.use(
    '/api/notes',
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );
};
