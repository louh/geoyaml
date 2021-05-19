# geoyaml

Write or parse GeoJSON as YAML.

Does the world need this? Not really. So why did I make it? Because it could be done.

**NOTE:** this is an _alpha_ stage project which means I wrote it moments before committing it and publishing an npm package, without testing or even bothering to try it out yet, please use cautiously if you happen to find it

## Usage

This is mostly just a wrapper around the [js-yaml](https://www.npmjs.com/package/js-yaml) library with the added step of running [geojsonhint](https://github.com/mapbox/geojsonhint) so you know if the output isn't valid GeoJSON.

```js
import geoyaml from 'geoyaml'

const geojson = geoyaml.load(doc)
```
