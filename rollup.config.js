import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  // browser-friendly UMD build
  {
    input: 'src/zasz.js',
    output: {
      name: 'howLongUntilLunch',
      file: 'dist/main.js',
      format: 'cjs'
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  }
]
