let mix = require('laravel-mix');

mix.js('src/js/scripts.js', 'js')
mix.sass('src/sass/styles.scss', 'css').options({
    processCssUrls: false
});;
mix.extract(['jquery']);
mix.setPublicPath('local/templates/main/')