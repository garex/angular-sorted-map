;(function (namespace, objectCreate) {
  function Temp () {}

  function extend (O) {
    Temp.prototype = O
    var obj = new Temp()
    Temp.prototype = null
    return obj
  }

  namespace.extend = objectCreate || extend
}(window.garex = window.garex || {}, Object.create))
