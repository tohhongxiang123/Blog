const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    exportPathMap: async function(
        defaultPathMap, { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
            '../posts': { page: '/posts' },
            '../notes': { page: '/notes' }
        }
    }
}