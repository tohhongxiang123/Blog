const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    assetPrefix: isProd ? 'https://cdn.statically.io/gh/tohhongxiang123/tohhongxiang123.github.io/gh-pages/' : '',
    // exportPathMap: async function(
    //     defaultPathMap, { dev, dir, outDir, distDir, buildId }
    // ) {
    //     return {
    //         '/': { page: '/' },
    //         '/posts/posttitle': { page: '/posts/[posttitle]' },
    //         '/notes/slug': { page: '/notes/[...slug]' }
    //     }
    // }
}