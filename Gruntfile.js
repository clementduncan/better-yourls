module.exports = function (grunt) {

  // Start out by loading the grunt modules we'll need
  require('load-grunt-tasks')(grunt);

  // Show elapsed time
  require('time-grunt')(grunt);

  grunt.initConfig(
    {

      /**
       * Clean existing files
       */
      clean: {
        styles:  {
          src: [
            'assets/css/*.css',
            'assets/css/*.map'
          ]
        },
        scripts: {
          src: [
            'assets/js/*.js',
            'assets/js/*.map'
          ]
        }
      },

      /**
       * Processes and compresses JavaScript.
       */
      uglify: {

        production: {

          options: {
            beautify:         false,
            preserveComments: false,
            sourceMap:        false,
            mangle:           {
              reserved: ['jQuery']
            }
          },

          files: {
            'assets/js/better-yourls.min.js': [
              'assets/js/src/better-yourls.js'
            ],
            'assets/js/admin-footer.min.js': [
              'assets/js/src/admin-footer.js'
            ]
          }
        },

        dev: {

          options: {
            beautify:         true,
            preserveComments: true,
            sourceMap:        true,
            mangle:           {
              reserved: ['jQuery']
            }
          },

          files: {
            'assets/js/better-yourls.min.js': [
              'assets/js/src/better-yourls.js'
            ],
            'assets/js/admin-footer.min.js': [
              'assets/js/src/admin-footer.js'
            ]
          }
        }
      },

      /**
       * Auto-prefix CSS Elements after SASS is processed.
       */
      autoprefixer: {

        options: {
          browsers: ['last 5 versions'],
          map:      true
        },

        files: {
          expand:  true,
          flatten: true,
          src:     ['assets/css/better-yourls.css'],
          dest:    'assets/css'
        }
      },

      /**
       * Minify CSS after prefixes are added
       */
      cssmin: {

        target: {

          files: [{
            expand: true,
            cwd:    'assets/css',
            src:    ['better-yourls.css'],
            dest:   'assets/css',
            ext:    '.min.css'
          }]

        }
      },

      /**
       * Process SASS
       */
      sass: {

        dist: {

          options: {
            style:     'expanded',
            sourceMap: true,
            noCache:   true
          },

          files: {
            'assets/css/better-yourls.css': 'assets/css/scss/better-yourls.scss'
          }
        }
      },

      /**
       * Update translation file.
       */
      makepot: {

        target: {
          options: {
            type:        'wp-plugin',
            domainPath:  '/languages',
            mainFile:    'better-yourls.php',
            potFilename: 'better-yourls.pot',
            exclude: ['vendor']
          }
        }
      },

      /**
       * Clean up the JavaScript
       */
      jshint: {
        options: {
          jshintrc: true
        },
        all:     ['assets/js/src/*.js']
      },

      /**
       * Watch scripts and styles for changes
       */
      watch: {

        options: {
          livereload: true
        },

        scripts: {

          files: [
            'assets/js/src/*'
          ],

          tasks: ['uglify:production']

        },

        styles: {

          files: [
            'assets/css/scss/*'
          ],

          tasks: ['sass', 'autoprefixer', 'cssmin']

        }
      }
    }
  );

  // A very basic default task.
  grunt.registerTask('default', ['jshint', 'uglify:production', 'uglify:dev', 'sass', 'autoprefixer', 'cssmin', 'makepot']);
  grunt.registerTask('dev', ['default', 'watch']);

};