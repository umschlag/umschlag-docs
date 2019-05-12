const gulp = require('gulp')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const size = require('gulp-size')
const browserify = require("browserify")
const babel = require("babelify")
const source = require("vinyl-source-stream")
const buffer = require("vinyl-buffer")
const sass = require('gulp-sass')
const tildeimporter = require('node-sass-tilde-importer')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify')
const changed = require('gulp-changed')

const paths = {
  clean: ['./static'],
  scripts: {
    src: 'source/index.js',
    dest: 'static/scripts/',
    name: 'docs.js'
  },
  styles: {
    src: 'source/**/*.scss',
    dest: 'static/styles/',
    name: 'docs.css'
  },
  images: {
    src: 'source/images/**',
    dest: 'static/images/'
  },
  files: {
    src: 'source/static/**',
    dest: 'static/'
  },
  fonts: {
    src: [
      'node_modules/ionicons/dist/fonts/*.eot',
      'node_modules/ionicons/dist/fonts/*.ttf',
      'node_modules/ionicons/dist/fonts/*.woff',
      'node_modules/ionicons/dist/fonts/*.woff2',
      'node_modules/ionicons/dist/fonts/*.svg'
    ],
    dest: 'static/fonts/'
  }
}

gulp.task('clean', (done) => {
  del(paths.clean)
  done()
})

gulp.task('scripts', (done) => {
  const bundler = browserify({
    entries: paths.scripts.src
  }, {
    debug: true
  }).transform(babel)

  bundler.bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source(paths.scripts.name))
    .pipe(buffer())
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(uglify())
      .pipe(concat(paths.scripts.name))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(size({ title: 'scripts' }))

  done()
})

gulp.task('scripts:watch', (done) => {
  gulp.watch(paths.scripts.src, gulp.series('scripts'))
  done()
})

gulp.task('styles', (done) => {
  const sassOptions = {
    importer: tildeimporter
  }

  const prefixerOptions = {
    browsers: ['last 2 versions']
  }

  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer(prefixerOptions))
      .pipe(cleancss())
      .pipe(concat(paths.styles.name))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(size({ title: 'styles' }))

  done()
})

gulp.task('styles:watch', (done) => {
  gulp.watch(paths.styles.src, gulp.series('styles'))
  done()
})

gulp.task('images', (done) => {
  gulp.src(paths.images.src)
    .pipe(changed(paths.images.dest))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(size({ title: 'images' }))

  done()
})

gulp.task('images:watch', (done) => {
  gulp.watch(paths.images.src, gulp.series('images'))
  done()
})

gulp.task('files', (done) => {
  gulp.src(paths.files.src)
    .pipe(changed(paths.files.dest))
    .pipe(gulp.dest(paths.files.dest))
    .pipe(size({ title: 'files' }))

  done()
})

gulp.task('files:watch', (done) => {
  gulp.watch(paths.static.src, gulp.series('files'))
  done()
})

gulp.task('fonts', (done) => {
  gulp.src(paths.fonts.src)
    .pipe(changed(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(size({ title: 'fonts' }))

  done()
})

gulp.task('fonts:watch', (done) => {
  gulp.watch(paths.fonts.src, gulp.series('fonts'))
  done()
})

gulp.task('watch', (done) => {
  gulp.watch(paths.scripts.src, gulp.series('scripts'))
  gulp.watch(paths.styles.src, gulp.series('styles'))
  gulp.watch(paths.images.src, gulp.series('images'))
  gulp.watch(paths.files.src, gulp.series('files'))
  gulp.watch(paths.fonts.src, gulp.series('fonts'))

  done()
})

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'scripts',
    'styles',
    'images',
    'files',
    'fonts'
  )
))
