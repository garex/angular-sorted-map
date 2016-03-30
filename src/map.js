;(function (namespace, MapEntry, hashCode) {
  function Map () {
    this.clear()
  }

  Map.prototype.keys = []
  Map.prototype.hashedKeys = {}
  Map.prototype.values = []
  Map.prototype.entries = []

  /**
   * @returns {Number}
   */
  Map.prototype.size = function () {
    return this.keys.length
  }

  /**
   * @returns {Boolean}
   */
  Map.prototype.isEmpty = function () {
    return 0 == this.size()
  }

  /**
   * @params {Object} key
   * @returns {Boolean}
   */
  Map.prototype.containsKey = function (key) {
    return indexOfObject(this.hashedKeys, hashCode(key)) > -1
  }

  /**
   * @params {Object} value
   * @returns {Boolean}
   */
  Map.prototype.containsValue = function (value) {
    return indexOf(this.values, value) > -1
  }

  /**
   * @params {Object} key
   * @returns {Object}
   */
  Map.prototype.get = function (key) {
    var i = indexOfObject(this.hashedKeys, hashCode(key))
    return (i == -1) ? undefined : this.values[i]
  }

  /**
   * @params {Object} key
   * @params {Object} value
   * @returns {Map}
   */
  Map.prototype.put = function (key, value) {
    var keyString = hashCode(key),
      i = indexOfObject(this.hashedKeys, keyString)

    if (i == -1) {
      this.putNew(keyString, new MapEntry(key, value))
    } else {
      this.values[i] = value
      this.entries[i].setValue(value)
    }

    return this
  }

  /**
   * @protected
   * @params {String} keyString
   * @params {MapEntry} entry
   */
  Map.prototype.putNew = function (keyString, entry) {
    this.hashedKeys[keyString] = this.keys.length
    this.keys.push(entry.key)
    this.values.push(entry.value)
    this.entries.push(entry)
  }

  /**
   * @params {Object} key
   * @returns {Object} Value, that was before under "key" or nothing
   */
  Map.prototype.remove = function (key) {
    var keyString = hashCode(key),
      i = indexOfObject(this.hashedKeys, keyString)

    if (i == -1) {
      return undefined
    }

    var removed = this.values[i]

    splice(this.keys, i)
    splice(this.values, i)
    splice(this.entries, i)

    for (var iMax = this.keys.length; i < iMax; i++) {
      this.hashedKeys[hashCode(this.keys[i])] = i
    }
    this.hashedKeys[keyString] = -1

    return removed
  }

  /**
   * @returns {Map}
   */
  Map.prototype.clear = function () {
    this.keys = clear(this.keys)
    this.hashedKeys = {}
    this.values = clear(this.values)
    this.entries = clear(this.entries)
    return this
  }

  namespace.Map = Map

  function clear (items) {
    items.length = 0
    items = []
    return items
  }

  function splice (items, i) {
    items.splice(i, 1)
  }

  function indexOfObject (object, property) {
    // this dummy ok as object must have only integer values
    return object[property] == undefined ? -1 : object[property]
  }

  function indexOf (items, item) {
    if (typeof items.indexOf != 'undefined') {
      return items.indexOf(item)
    }

    for (var i = 0, iMax = items.length; i < iMax; i++) {
      if (item === items[i]) {
        return i
      }
    }

    return -1
  }
}(window.garex, window.garex.MapEntry, window.garex.hashCode))
