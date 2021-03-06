import fs from 'fs'
import assert from 'assert'
import geoyaml from '../lib/index.js'

describe('geoyaml.load', function () {
  it('converts a geoyaml feature to geojson', function () {
    const yaml = fs.readFileSync('test/fixtures/feature.geoyaml', 'utf8')
    const json = fs.readFileSync('test/fixtures/feature.geojson', 'utf8')
    const result = geoyaml.load(yaml)

    // parsed GeoYAML and parsed JSON should be a deep-equal JS object
    assert.deepStrictEqual(result, JSON.parse(json))
  })

  it('converts a geoyaml feature collection to geojson', function () {
    const yaml = fs.readFileSync('test/fixtures/feature-collection.geoyaml', 'utf8')
    const json = fs.readFileSync('test/fixtures/feature-collection.geojson', 'utf8')
    const result = geoyaml.load(yaml)

    // parsed GeoYAML and parsed JSON should be a deep-equal JS object
    assert.deepStrictEqual(result, JSON.parse(json))
  })

  it('throws an error on a bad geoyaml', function () {
    const yaml = fs.readFileSync('test/fixtures/feature-bad.geoyaml', 'utf8')

    function test () {
      try {
        geoyaml.load(yaml)
      } catch (err) {
        throw err
      }
    }

    assert.throws(test)
  })
})

describe('geoyaml.loadAll', function () {
  it('converts a multi-doc geoyaml file to geojsons', function () {
    const yaml = fs.readFileSync('test/fixtures/multi.geoyaml', 'utf8')
    const ndjson = fs.readFileSync('test/fixtures/multi.ndjson', 'utf8')

    // Supply an iterator function to create a newline-delimited JSON
    let string = ''
    const result = geoyaml.loadAll(yaml, function (doc) {
      string += JSON.stringify(doc) + '\n'
    })

    // yaml.loadAll should have a return value of `undefined` when
    // an iterator function is provided, as it is here
    assert.strictEqual(result, undefined)

    // parsed GeoYAML and NDJSON should be equal
    assert.strictEqual(string, ndjson)
  })

  it('converts a multi-doc geoyaml file to array of json', function () {
    const yaml = fs.readFileSync('test/fixtures/multi.geoyaml', 'utf8')
    const json = fs.readFileSync('test/fixtures/multi.json', 'utf8')
    const result = geoyaml.loadAll(yaml)

    // parsed GeoYAML and JSON should be equal
    assert.deepStrictEqual(result, JSON.parse(json))
  })

  it('throws an error when a multi-doc geoyaml has a bad document', function () {
    const yaml = fs.readFileSync('test/fixtures/multi-bad.geoyaml', 'utf8')

    function test () {
      try {
        geoyaml.loadAll(yaml)
      } catch (err) {
        throw err
      }
    }

    assert.throws(test)
  })
})

describe('geoyaml.dump', function () {
  it('converts a geojson feature to geoyaml', function () {
    const yaml = fs.readFileSync('test/fixtures/feature.geoyaml', 'utf8')
    const json = fs.readFileSync('test/fixtures/feature.geojson', 'utf8')
    const result = geoyaml.dump(json)

    // the resulting YAML dump doesn't have the leading `---`, so we remove it
    // from the comparison YAML doc for testing
    assert.strictEqual(result, yaml.replace('---\n', ''))
  })

  it('throws an error on a bad geojson', function () {
    const json = fs.readFileSync('test/fixtures/feature-bad.geojson', 'utf8')

    function test () {
      try {
        geoyaml.dump(json)
      } catch (err) {
        throw err
      }
    }

    assert.throws(test)
  })
})
