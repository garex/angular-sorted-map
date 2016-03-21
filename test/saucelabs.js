;(function (window, QUnit) {
  var log = []

  QUnit.log(function (details) {
    if (details.result) {
      return
    }
    log.push(details)
  })

  QUnit.done(function (test_results) {
    test_results.tests = []

    for (var i = 0, len = log.length; i < len; i++) {
      var details = log[i],
        name = details.module ? details.module + ': ' + details.name : details.name

      test_results.tests.push({
        name: name,
        message: details.message,
        result: details.result,
        expected: details.expected,
        actual: details.actual,
        source: details.source
      })
    }

    window.global_test_results = test_results
  })
})(window, window.QUnit)
