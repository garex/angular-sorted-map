# Angular SortedMap

<a href="https://travis-ci.org/garex/angular-sorted-map"><img alt="Angular SortedMap build status on travis" align="right" src="https://travis-ci.org/garex/angular-sorted-map.svg?branch=develop" /></a> Angular `ng-repeat` ready SortedMap implementation

## Why

Native JavaScript Map and it's polyfills non-compatible with angular's `ng-repeat` directive.
Also currently JavaScript dont' have out-of-the-box SortedMap implementation.

So I'm try to provide it.

## Where to use?

This version should be used only in browsers and in AngularJS projects.
As there are many other good implementations for node and plain javascript.

## Browsers compatibility

[![Sauce Test Status](https://saucelabs.com/browser-matrix/angular-sorted-map.svg)](https://saucelabs.com/u/angular-sorted-map)

## Is it optimized?

No. Under the hood map is just arrays with keys hash for checking.
And sorted map is not red-black tree, but same arrays and hash for checking.
Only binary search used to add new items.

Anyway, if you will work in angular with huge hashes/lists -- it will be a pain.
So it mostly optimized for Angular repeat operations.
