'use strict'

var yaml = require('js-yaml')
var geojsonhint = require('@mapbox/geojsonhint')

var load = function (string, options) {
  var doc
  try {
    doc = yaml.load(string, options)
  } catch (err) {
    throw err
  }

  var errors = geojsonhint.hint(doc)
  if (errors.length > 0) {
    throw errors
  }

  return doc
}

var loadAll = function (string, iterator, options) {
  var array = []
  var iteratorWrapper = function (doc) {
    var errors = geojsonhint.hint(doc)
    if (errors.length > 0) {
      throw errors
    }

    if (typeof iterator === 'function') {
      iterator(doc)
    }

    array.push(doc)
  }

  try {
    yaml.loadAll(string, iteratorWrapper, options)
  } catch (err) {
    throw err
  }

  // The idea is to match js-yaml behavior where if an
  // iterator function is provided, the return value is
  // undefined, otherwise, return the array of results
  if (typeof iterator !== 'function') {
    return array
  }
}

var dump = function (geojson, options) {
  var errors = geojsonhint.hint(geojson)
  if (errors.length > 0) {
    throw errors
  }

  var object = typeof geojson === 'string' ? JSON.parse(geojson) : geojson
  return yaml.dump(object, options)
}

module.exports = {
  load: load,
  loadAll: loadAll,
  dump: dump
}
