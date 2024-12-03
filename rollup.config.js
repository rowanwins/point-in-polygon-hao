import terser from '@rollup/plugin-terser'
import buble from '@rollup/plugin-buble'
import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'

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

// Each javascript flavour gets its own copy of the d.ts file, with an 
// appropriate extension.
export default [
    output('./dist/esm/index.js', [
        buble(),
        copy({
            targets: [
                { src: 'index.d.ts', dest: 'dist/esm' },
            ]
        })
    ], 'esm'),
    output('./dist/cjs/index.cjs', [
        // To get around robust-predicates dependency being ESM only, pull it in
        // and bundle it inline as CJS for this distribution file.
        resolve(),
        buble(),
        copy({
            targets: [
                { src: 'index.d.ts', dest: 'dist/cjs', rename: 'index.d.cts' },
            ]
        })
    ], 'cjs'),
    output('./dist/pointInPolygon.js', [resolve(), buble()], 'umd'),
    output('./dist/pointInPolygon.min.js', [resolve(), buble(), terser()], 'umd')
]
