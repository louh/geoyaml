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

Does the world need this? Not really. So why did I make it? Because it could be done.

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
