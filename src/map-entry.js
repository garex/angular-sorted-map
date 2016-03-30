;(function (namespace) {
  function MapEntry (key, value) {
    this.key = key
    this.value = value
    this.setValue = function (newValue) {
      this.value = newValue
      return this
    }
  }

  namespace.MapEntry = MapEntry
}(window.garex = window.garex || {}))
