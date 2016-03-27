;(function (namespace, Map, extend, hashCode) {
  function SortedMap () {
    Map.apply(this, arguments)
  }

  SortedMap.prototype = extend(Map.prototype)

  /**
   * @protected
   * @params {String} keyString
   * @params {MapEntry} entry
   */
  SortedMap.prototype.putNew = function (keyString, entry) {
    // find starting index
    var startingIndex = -binarySearch(this.keys, keyString) - 1,
      keysLength = this.keys.length

    // when existing keys behind new key -- use base put
    if (startingIndex == keysLength) {
      return Map.prototype.putNew.apply(this, arguments)
    }

    // set hashedKeys to startingIndex
    this.hashedKeys[keyString] = startingIndex

    // update indexes after startingIndex at hashedKeys
    for (var i = startingIndex, iMax = keysLength; i < iMax; i++) {
      this.hashedKeys[hashCode(this.keys[i])] = i + 1
    }

    // inject key/value/entry before startingIndex
    insert(this.keys, startingIndex, entry.getKey())
    insert(this.values, startingIndex, entry.getValue())
    insert(this.entries, startingIndex, entry)
  }

  namespace.SortedMap = SortedMap

  function binarySearch (items, item) {
    var low = 0,
      high = items.length - 1,
      middle,
      midVal

    while (low <= high) {
      middle = (low + high) >> 1
      current = hashCode(items[middle])

      if (current < item) {
        low = middle + 1
      } else if (current > item) {
        high = middle - 1
      } else {
        return middle
      }
    }

    return -(low + 1)
  }

  function insert (items, i, item) {
    items.splice(i, 0, item)
  }
}(window.garex, window.garex.Map, window.garex.extend, window.garex.hashCode))
