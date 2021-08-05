import {terser} from 'rollup-plugin-terser'
import buble from '@rollup/plugin-buble'

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
    output('./dist/pointInPolygon.mjs', [buble()], 'es'),
    output('./dist/pointInPolygon.js', [buble()], 'umd'),
    output('./dist/pointInPolygon.min.js', [buble(), terser()], 'umd')
]
