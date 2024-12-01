import terser from '@rollup/plugin-terser'
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const output = (file, plugins, format) => ({
    input: './src/index.js',
    output: {
        name: 'pointInPolygon',
        file,
        format,
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/pointInPolygon.esm.js', [buble()], 'esm'),
    output('./dist/pointInPolygon.cjs.js', [buble()], 'cjs'),
    output('./dist/pointInPolygon.js', [commonjs(), resolve(), buble()], 'umd'),
    output('./dist/pointInPolygon.min.js', [commonjs(), resolve(), buble(), terser()], 'umd')
]
