import terser from '@rollup/plugin-terser'
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

const output = (file, plugins, format) => ({
    input: './src/index.js',
    output: {
        name: 'pointInPolygon',
        file,
        format,
        exports: 'default',
        interop: 'auto',
    },
    plugins
})

export default [
    output('./dist/pointInPolygon.mjs', [], 'esm'),
    output('./dist/pointInPolygon.cjs', [dynamicImportVars({
        include: 'robust-predicates'
    }), commonjs()], 'cjs'),
    output('./dist/pointInPolygon.js', [resolve({resolveOnly: []}), commonjs()], 'umd'),
    output('./dist/pointInPolygon.min.js', [resolve({resolveOnly: []}), commonjs(), terser()], 'umd')
]
