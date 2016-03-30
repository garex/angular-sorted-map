# Angular SortedMap

<a href="https://travis-ci.org/garex/angular-sorted-map"><img alt="Angular SortedMap build status on travis" align="right" src="https://travis-ci.org/garex/angular-sorted-map.svg?branch=develop" /></a> Angular `ng-repeat` ready SortedMap implementation

## Why

Native JavaScript Map and it's polyfills non-compatible with angular's `ng-repeat` directive.
Also currently JavaScript dont' have out-of-the-box SortedMap implementation.

So I'm try to provide it.

## Where to use?

This version should be used only in browsers and in AngularJS projects.
As there are many other good implementations for node and plain javascript.

## Usage

In production use `lib/angular-sorted-map.min.js`.

```js
var map = new garex.SortedMap
map
  .put('key', 'value')
  .put({key: 'key'}, {value: 2})
  .put(new garex.MapEntry(1, 'one')) // or any other MapEntry compatible class

map.keys[0]   // 1
map.keys[1]   // 'key'
map.keys[2]   // {key: 'key'}

map.values[0] // 'one'
map.values[1] // 'value'
map.values[2] // {value: 2}

map.entries[0].key    // 1
map.entries[1].value  // 'value'
map.entries[2]        // MapEntry

map.size()          // 3
map.isEmpty()       // false

map.containsKey(1)  // true
map.containsKey(2)  // false
map.containsValue('one')  // true
map.containsValue('two')  // false

map.get(1)      // 'one'
map.get(2)      // undefined
map.get('key')  // 'value'

map.remove(1)   // 'one'
map.size()      // 2

map.clear()     // entries
map.size()      // 0
map.isEmpty()   // true
```

## Browsers compatibility

[![Sauce Test Status](https://saucelabs.com/browser-matrix/angular-sorted-map.svg)](https://saucelabs.com/u/angular-sorted-map)

## Is it optimized?

No. Under the hood map is just arrays with keys hash for checking.
And sorted map is not red-black tree, but same arrays and hash for checking.
Only binary search used to add new items (thanks to Java's `java.util.Arrays::binarySearch`).

Anyway, if you will work in angular with huge hashes/lists — it will be a pain.
So it mostly optimized for Angular repeat operations.
