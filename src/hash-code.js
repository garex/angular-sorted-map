;(function (namespace) {
  function hashCode (value) {
    return isObject(value) ? stringifyObject(value) : value.toString()
  }

  function isObject (value) {
    if (value === null) {
      return false
    }
    return 'object' === typeof value
  }

  function stringifyString (value) {
    return value.toString()
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty,
    hasJSON = (typeof JSON != 'undefined')
  function stringifyObject (value) {
    if (typeof value.hashCode == 'function') {
      return value.hashCode()
    }
    if (hasJSON) {
      return JSON.stringify(value)
    }
    var result = ''
    for (var property in value) {
      if (!hasOwnProperty.call(value, property)) {
        continue
      }
      result += '{' + property + ':' + stringify(value[property]) + '}'
    }
    return result
  }

  var stringifyTypes = {
    'string': stringifyString,
    'number': stringifyString,
    'boolean': stringifyString,
    'object': stringifyObject
  }
  function stringify (value) {
    if (value === null) {
      return 'null'
    }
    var type = typeof value
    return stringifyTypes[type] ? stringifyTypes[type](value) : 'undefined'
  }

  namespace.hashCode = hashCode
}(window.garex = window.garex || {}))
