import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { default as swc } from '@rollup/plugin-swc'
import { readFileSync } from 'fs'

const { author, homepage, license, main, module, name, version } = JSON.parse(readFileSync('./package.json'))

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * Released under the ${license} license
 */`

const plugins = (minify) => [
  json(),
  resolve({ extensions: ['.ts', '.mjs', '.js', '.json'] }),
  swc({
    jsc: {
      parser: {
        syntax: 'typescript',
      },
      target: 'es2022',
    },
    module: {
      type: 'es6',
    },
    sourceMaps: true,
  }),
  terser(),
]

export default [
  {
    input: 'src/index.ts',
    output: {
      name: name,
      file: module,
      sourcemap: true,
      banner: banner,
      format: 'esm',
      indent: false,
    },
    plugins: plugins(),
    external: ['chart.js', 'chart.js/helpers'],
  },
]
