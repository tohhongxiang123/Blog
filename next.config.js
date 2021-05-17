const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'styles')],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        })

        return config
    },
    env: {
        NOTES_PATH: 'notes',
        POSTS_PATH: 'posts',
        PROJECTS_PATH: 'projects'
    }
}