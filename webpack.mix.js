const mix = require('laravel-mix')

mix.disableNotifications()
mix.setPublicPath('app/static')
mix.sourceMaps(false, 'source-map')
mix.extract()
mix.version()

const postcssPlugins = [
    require('postcss-sort-media-queries')()
]

if (mix.inProduction()) {
    postcssPlugins.push(require('postcss-combine-duplicated-selectors')())
}

mix.options({
    postCss: postcssPlugins
})

mix.browserSync({
    proxy: 'localhost:8000',
    open: false,
    notify: false,
    files: [
        'app/templates/**/*.html',
    ]
})

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
})

mix.copyDirectory('app/src/static', 'app/static')

mix.js('app/src/js/main.js', 'js')

mix.sass('app/src/scss/main.scss', 'css')