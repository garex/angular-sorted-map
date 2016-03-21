module.exports = function (grunt) {
  var browser = (process.env.SAUCE_BROWSER || 'internet explorer, 6, xp').split(/,\s*/),
    browserName = browser[0],
    browserVersion = (browser.length == 3) ? browser[1] : '',
    browserPlatform = browser[browser.length - 1]

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
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
          build: 'Angular SortedMap #' + process.env.TRAVIS_BUILD_NUMBER,
          testname: 'Angular SortedMap #' + process.env.TRAVIS_JOB_NUMBER,
          sauceConfig: {
            recordVideo: false,
            recordScreenshots: false
          },
          onTestComplete: function (result, callback) {
            if (result.passed) {
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

  grunt.registerTask('test', ['connect', 'saucelabs-qunit'])
}
