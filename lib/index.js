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
  var iteratorWrapper = function (doc) {
    var errors = geojsonhint.hint(doc)
    if (errors.length > 0) {
      throw errors
    }

    if (typeof iterator === 'function') {
      iterator(doc)
    }
  }

  var doc
  try {
    doc = yaml.loadAll(string, iteratorWrapper, options)
  } catch (err) {
    throw err
  }

  return doc
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
