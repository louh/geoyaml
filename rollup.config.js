const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const nodePolyfills = require('rollup-plugin-node-polyfills')
const { terser } = require('rollup-plugin-terser')

const plugins = [ nodePolyfills(), nodeResolve(), commonjs() ]
const umd_out_base = { format: 'umd', name: 'geoyaml', exports: 'default' }

module.exports = [
  // es5
  {
    input: 'lib/index.js',
    output: [
      { ...umd_out_base, file: 'dist/geoyaml.js' },
      { ...umd_out_base, file: 'dist/geoyaml.min.js', plugins: [ terser() ] }
    ],
    plugins
  },
  // esm
  {
    input: 'lib/index.js',
    output: [
      { format: 'esm', file: 'dist/geoyaml.mjs' },
    ],
    plugins
  }
]
