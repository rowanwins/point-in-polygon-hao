import {terser} from 'rollup-plugin-terser'

const output = (file, plugins) => ({
    input: './src/index.js',
    output: {
        name: 'pointInPolygon',
        file,
        format: 'umd',
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/pointInPolygon.js', []),
    output('./dist/pointInPolygon.min.js', [terser()])
]