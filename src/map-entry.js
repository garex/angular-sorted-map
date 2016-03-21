;(function (namespace) {
  function MapEntry (key, value) {
    this.getKey = function () {
      return key
    }
    this.getValue = function () {
      return value
    }
    this.setValue = function (newValue) {
      value = newValue
      return this
    }
  }

  namespace.MapEntry = MapEntry
}(window.garex = window.garex || {}))
