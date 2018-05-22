del = require 'del'
gulp = require 'gulp'
gutil = require 'gulp-util'
path = require 'path'
runSequence = require 'run-sequence'
help = require('gulp-help') gulp, hideEmpty: true

process.on 'SIGINT', process.exit


# Task aliases
# ------------------------------------------------------------------------------

gulp.task 'styles', 'Compile Sass.', ['sass']
gulp.task 'scripts', 'Compile Coffeescript and JS.', ['webpack']
gulp.task 'default', 'Compile Sass, Coffeescript, JS, sprites.', ['sprites', 'scripts']
gulp.task 'lint', 'Lint Sass and Coffeescript.', ['lint:sass', 'lint:coffee']
gulp.task 'sprites', 'Compile SVG files into sprites.', (done) -> runSequence 'sprites:svg', 'styles', done
gulp.task 'dist', 'Generate, version and minify assets. Dist assets are saved to location specified in gulpfile (paths.dist).', (done) ->
  global.production = true
  runSequence 'default', 'rev', ['compress:css', 'compress:js'], done


# Paths
# ------------------------------------------------------------------------------

paths = {}
paths.root = path.join path.resolve(__dirname), '/'
paths.docroot = path.join paths.root, 'public/'

# Source media
paths.src = path.join paths.root, 'app/assets/'
paths.sass = path.join paths.src, 'sass/'
paths.modules = path.join paths.src, 'javascripts/'
paths.spritesSrc = path.join paths.src, 'sprites/'
paths.vendor = path.join paths.root, 'node_modules/'

# Compiled media
paths.css = path.join paths.docroot, 'media/', 'stylesheets/'
paths.js = path.join paths.docroot, 'media/', 'javascripts/'
paths.sprites = path.join paths.docroot, 'media/', 'images/', 'sprites/'
paths.dist = path.join paths.docroot, 'dist/'


# CSS
# ------------------------------------------------------------------------------

autoprefixer = require 'autoprefixer'
easings = require 'postcss-easings'
globSass = require 'gulp-sass-glob-import'
importOnce = require 'node-sass-import-once'
initial = require 'postcss-initial'
lazyPipe = require 'lazypipe'
mqDedupe = require 'postcss-mq-dedupe'
postcss = require 'gulp-postcss'
sass = require 'gulp-sass'
precision = 10
pxtorem = require 'postcss-pxtorem'

gulp.task 'sass', ->
  unless global.production
    sourcemaps = require 'gulp-sourcemaps'
    notify = require 'gulp-notify'
    sassLint = require 'gulp-sass-lint'

  stream = lazyPipe()

  unless global.production
    stream = stream
      .pipe sassLint
      .pipe sassLint.format

  stream = stream.pipe sourcemaps.init unless global.production # Dev only

  # Main task functionality
  stream = stream
    .pipe globSass
    .pipe sass,
      includePaths: [paths.spritesSrc, paths.vendor]
      precision: precision
      importer: importOnce
      importOnce:
        css: true
        index: true
    .pipe postcss, [
      mqDedupe()
      initial()
      easings()
      pxtorem
        propList: ['*']
        minPixelValue: 3
        unitPrecision: precision
      autoprefixer browsers: [ # https://github.com/ai/browserslist#queries
        '> 1%'
        'last 2 versions'
        'Firefox ESR'
        'Explorer >= 10'
        'Safari >= 8' # Last Safari version w/prefixed transform
      ]
    ]

  stream = stream.pipe sourcemaps.write unless global.production # Dev only
  stream = stream.pipe gulp.dest, paths.css # Write file

  gulp.src "#{paths.sass}**/*.scss"
    .pipe stream()
    .on 'error', logger.error


# Webpack
# ------------------------------------------------------------------------------

webpack = require 'webpack'

gulp.task 'webpack', (done) ->
  task = this

  config =
    entry:
      app: "#{paths.modules}app.coffee"
      fonts: "#{paths.modules}fonts.coffee"
    devtool: unless global.production then 'cheap-module-eval-source-map'
    watch: global.isWatching
    output:
      filename: '[name].js'
      path: paths.js
    resolve:
      extensions: ['.js', '.coffee']
    module:
      loaders: [
        test: /\.coffee$/
        loader: 'coffee-loader'
      ]
    plugins: [
      new webpack.ProvidePlugin
        $: 'jquery'
        jQuery: 'jquery'
        'window.$': 'jquery'
        'window.jQuery': 'jquery'
    ]

  webpack config, (err, stats) ->
    info = stats.toJson()

    if err
      process.exit()
      hasError = true
      logger.error.call task, new gutil.PluginError 'webpack', message: err.details || err.stack || err

    if stats.hasErrors()
      hasError = true
      logger.error.call task, new gutil.PluginError 'webpack', message: info.errors

    if stats.hasWarnings()
      logger.error.call task, new gutil.PluginError 'webpack', message: info.warnings

    unless global.isWatching
      done(if hasError then 1 else 0)


# Sprites
# ------------------------------------------------------------------------------

fs = require 'fs'
glob = require 'glob'
SVGSpriter = require 'svg-sprite'

gulp.task 'sprites:svg', ['clear:sprites'], (done) ->
  glob "#{paths.spritesSrc}*/", (error, dirs) ->
    i = 0
    end = -> done() if ++i is dirs.length

    dirs.forEach (dir) ->
      name = path.basename dir
      spriter = new SVGSpriter
        mode:
          css:
            prefix: "icon--#{name}__%s"
            render: scss: template: "#{paths.spritesSrc}tmpl.scss"
          symbol: example: true

      glob "#{dir}svg/*.svg", (err, svgs) ->
        if svgs.length is 0
          end()
          return

        svgs.forEach (svg) ->
          spriter.add(
            svg,
            path.basename(svg),
            fs.readFileSync svg, encoding: 'utf-8'
          )

        spriter.compile (error, result, data) ->
          fs.writeFileSync "#{paths.sprites + name}.svg", result.symbol.sprite.contents
          fs.writeFileSync "#{dir}sprite.html", result.symbol.example.contents
          fs.writeFileSync "#{dir}_sprite.scss", result.css.scss.contents
          end()

gulp.task 'clear:sprites', (done) -> del ["#{paths.sprites}**/*", "!#{paths.sprites}.keep"], done


# Watchers
# ------------------------------------------------------------------------------

gulp.task 'watch', 'Compile assets on change to source files (Sass, Coffeescript, JS, sprites).', -> runSequence 'sprites', ->
  chokidar = require 'chokidar'
  liveReload = require 'gulp-livereload'

  global.isWatching = true

  watch = (pattern, callback) ->
    chokidar.watch(pattern, ignoreInitial: true).on 'all', (event, path) ->
      logger.log event, gutil.colors.magenta path
      callback event, path

  # Start LiveReload server (requires browser extension: http://livereload.com/extensions/)
  liveReload.listen
    basePath: paths.docroot
    quiet: true

  # Notify LiveReload on file changes in docroot
  watch paths.docroot, (event, path) -> liveReload.changed path

  # Run styles task on SCSS change
  watch "#{paths.src}**/*.scss", -> runSequence 'styles'

  # Run sprites task on sprite SVG change
  watch "#{paths.spritesSrc}**/*.svg", -> runSequence 'sprites'

  # Start Webpack in watch mode
  runSequence 'scripts'


# Versioning
# ------------------------------------------------------------------------------

rev = require 'gulp-rev'

gulp.task 'clear:dist', 'Remove previously generated dist files.', (done) -> del ["#{paths.dist}**/*", "!#{paths.dist}.keep"], done

gulp.task 'rev', ['clear:dist'], ->
  gulp.src [
    "#{paths.css}**/*.css"
    "#{paths.js}**/*.js"
  ], base: paths.docroot
  .pipe rev()
  .pipe gulp.dest paths.dist
  .pipe rev.manifest()
  .pipe gulp.dest paths.dist


# Compress
# ------------------------------------------------------------------------------

csso = require 'gulp-csso'
uglify = require 'gulp-uglify'

gulp.task 'compress:css', ->
  gulp.src "#{paths.dist}**/*.css"
    .pipe csso restructure: false
    .pipe gulp.dest paths.dist

gulp.task 'compress:js', ->
  gulp.src "#{paths.dist}**/*.js"
    .pipe uglify()
    .pipe gulp.dest paths.dist


# Lint
# ------------------------------------------------------------------------------

gulp.task 'lint:sass', ->
  sassLint = require 'gulp-sass-lint'

  gulp.src "#{paths.sass}**/*.scss"
    .pipe sassLint()
    .pipe sassLint.format()

gulp.task 'lint:coffee', ->
  coffeelint = require 'gulp-coffeelint'

  gulp.src "#{paths.modules}**/*.coffee"
    .pipe coffeelint optFile: "#{paths.modules}lint.json"
    .pipe coffeelint.reporter()


# Logging
# ------------------------------------------------------------------------------

logger =
  log: (parts...) ->
    gutil.log.call null, logger.format.apply null, parts
  format: (parts...) ->
    parts.join(' ').trim().replace paths.root, '', 'g'
  error: (error) ->
    if global.production
      console.error error
    else
      require('gulp-notify').onError
        title: error.plugin
        message: logger.format error.message
      .call this, error

    @emit 'end'
