;(function (namespace, Map, extend) {
  function SortedMap () {
    Map.apply(this, arguments)
  }

  SortedMap.prototype = extend(Map.prototype)

  namespace.SortedMap = SortedMap
}(window.garex, window.garex.Map, window.garex.extend))
