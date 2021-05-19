# geoyaml

Write or parse GeoJSON as YAML. Like this:

```yaml
type: FeatureCollection
features:
  - geometry:
      type: Point
      coordinates:
        - 37.96875
        - 37.71859032558816
    properties:
      name: Hello World
```

Wow, so neat and so clean. No brackets or commas or quotation marks. ugh punctuation is the worst

## Technical details

This is mostly just a wrapper around the [js-yaml](https://www.npmjs.com/package/js-yaml) library with the added step of running [geojsonhint](https://github.com/mapbox/geojsonhint) so you know if the output isn't valid GeoJSON. This is not exactly great dependency hygiene but I'll be damned if anyone else occupies this package namespace.

## Usage

In a JavaScript module:

```js
import geoyaml from 'geoyaml'

// `doc` is a string that is the contents of a YAML file
const geojson = geoyaml.load(doc)
```

From the command line:

**TODO**

## But why

There might be some real reasons why you might want to write GeoJSON as YAML.

- You want some features of YAML you can't have in JSON, like comments or header metadata
- You want small amounts of data to be more human-readable or human-editable than JSON
- You want to have multiple documents in one file, something that can be achieved with Newline Delimited JSON or JSONL (but is inherently less human-readable)
- You want to have multiple formats of documents in one file, e.g. geo data in YAML and description in Markdown, which cannot be parsed as valid JSON without embedding into string values
