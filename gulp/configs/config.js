module.exports = {
  input: {
    scss: './resources/assets/scss/*.scss',
    entry: ["./resources/assets/js/index.js"
        ],
    js: './resources/assets/js/**/*.js'
  },
  output: {
    dist: './public/',
    js: 'js',
    css: 'css',
    scss: './resources/assets/scss/'
  },
  production: true
};
