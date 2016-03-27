module.exports = function (grunt) {
  var browser = (process.env.SAUCE_BROWSER || 'internet explorer, 6, xp').split(/,\s*/),
    browserName = browser[0],
    browserVersion = (browser.length == 3) ? browser[1] : '',
    browserPlatform = browser[browser.length - 1],
    jobNumber = process.env.TRAVIS_JOB_NUMBER || (new Date).toISOString(),
    buildNumber = process.env.TRAVIS_BUILD_NUMBER || jobNumber.split('.')[0]

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    year: (new Date()).getFullYear(),
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        preserveComments: false,
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | © <%= year %> <%= pkg.author %> | <%= pkg.license %> */'
      },
      lib: {
        files: {
          'lib/angular-sorted-map.min.js': [
            'src/extend.js',
            'src/map-entry.js',
            'src/hash-code.js',
            'src/map.js',
            'src/sorted-map.js',
          ]
        }
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/test/index.html'
          ],
          browsers: [{
            browserName: browserName,
            version: browserVersion,
            platform: browserPlatform
          }],
          build: 'Angular SortedMap #' + buildNumber,
          testname: 'Angular SortedMap #' + jobNumber,
          sauceConfig: {
            recordVideo: false,
            recordScreenshots: false
          },
          onTestComplete: function (result, callback) {
            if (result.passed || result.result == null) {
              callback(null, result.passed)
              return
            }

            grunt.log.subhead('\nFailed tests')
            for (var i = 0, iMax = result.result.tests.length; i < iMax; i++) {
              var test = result.result.tests[i]
              grunt.log.writeln('')
              grunt.log.writeln('  %s', test.name)
              if (test.message) {
                grunt.log.writeln('    %s', test.message)
              }
              grunt.log.writeln('    expected: %s', test.expected)
              grunt.log.writeln('      actual: %s', test.actual)
            }

            callback(null, result.passed)
          }
        }
      }
    },
    watch: {}
  })

  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-saucelabs')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  grunt.registerTask('test', ['connect', 'saucelabs-qunit'])
}
