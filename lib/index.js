'use strict'

var yaml = require('js-yaml')
var cg = require('check-geojson')

var load = function (string, options) {
  var doc
  try {
    doc = yaml.load(string, options)
  } catch (err) {
    throw err
  }

  var parseValue
  try {
    parseValue = cg.check(JSON.stringify(doc))
  } catch (error) {
    throw error.issues
  }

  return parseValue
}

var loadAll = function (string, iterator, options) {
  var array = []
  var iteratorWrapper = function (doc) {
    var parseValue
    try {
      parseValue = cg.check(JSON.stringify(doc))
    } catch (error) {
      throw error.issues
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
  // Create a string for checking
  var string = typeof geojson !== 'string' ? JSON.stringify(geojson) : geojson
  var parseValue
  try {
    parseValue = cg.check(string)
  } catch (error) {
    throw error.issues
  }

  return yaml.dump(parseValue, options)
}

module.exports = {
  load: load,
  loadAll: loadAll,
  dump: dump
}
