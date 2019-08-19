module.exports = {
    devServer: {
        port: 8009,
        public: '0.0.0.0',
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8360/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'api'
                }
            },
            '/admin': {
                target: 'http://127.0.0.1:8360/',
                changeOrigin: true,
                pathRewrite: {
                    '^/admin': 'admin'
                }
            }
        }
    }
}
