import commonjs from '@rollup/plugin-commonjs'
//import pkg from './package.json'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import {visualizer} from 'rollup-plugin-visualizer'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
// import sass from 'rollup-plugin-sass';
// import autoprefixer from 'autoprefixer'
// import css from "rollup-plugin-import-css";
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
// import {RollupOptions} from "rollup";
import preserveDirectives from 'rollup-preserve-directives'

const commonPlugins = [

    //del({targets: 'lib/*'}),
    commonjs(),
    nodeResolve({
        // extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // moduleDirectories: ['node_modules', 'src'],
        // preferBuiltins: false
    }),
    json(),
    typescript({
        tsconfig: 'tsconfig.json',
    }),
    preserveDirectives(),
    // sass(),
    // scssPlugin({
    //     // fileName: 'bundle.css',
    //     include: ['**/*.css', '**/*.scss'],
    //     exclude: 'node_modules/**'
    // }),
    // cssModules(),
    // postcss({
    //     // sourceMap: true,
    //     extract: true,
    //     plugins: [autoprefixer()],
    //     // minimize: true,
    //     // writeDefinitions: true,
    //     modules: true,
    //     namedExports: true,
    //     // process: sass,
    //     //use: ['scss'],
    // }),
    //css(),
    strip({
        include: ['**/*.(js|mjs|ts|tsx)'],
        debugger: true,
        functions: ['console.log', 'console.debug'],
        sourceMap: true
    }),
    terser(),
    visualizer({
        filename: 'build/status.common.html'
    })
]

let commonConfig = [{
    strictDeprecations: true,
    input: 'src/index.common.tsx',
    output: {
        file: 'lib/index.common.mjs',
        format: 'esm',
        sourcemap: false,
        assetFileNames: '[name][extname]'
    },
    external: [
        //...Object.keys(pkg.dependencies || {})
    ],
    plugins: commonPlugins
},
    {
        input: 'src/index.common.tsx',
        output: {
            file: 'lib/index.common.cjs',
            format: 'cjs',
            sourcemap: true,
            assetFileNames: '[name][extname]'
        },
        external: [],
        plugins: commonPlugins
    },
    {
        input: 'lib/dts/index.common.d.ts',
        output: [{file: 'lib/index.common.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: [
            dts()
        ]
    }
]

const serverConfig = [{
    input: 'src/index.server.tsx',
    output: {
        file: 'lib/index.server.mjs',
        format: 'esm',
        sourcemap: false,
        assetFileNames: '[name][extname]'
    },
    external: ['react'],
    plugins: commonPlugins
}, {
    input: 'src/index.server.tsx',
    output: {
        file: 'lib/index.server.cjs',
        format: 'cjs',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: ['react'],
    plugins: commonPlugins
},
    {
        input: 'lib/dts/index.server.d.ts',
        output: [{file: 'lib/index.server.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: [
            dts()
        ]
    }
]

const clientConfig = [{
    input: 'src/index.client.tsx',
    output: {
        file: 'lib/index.client.mjs',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: ['react'],
    plugins: commonPlugins
}, {
    input: 'src/index.client.tsx',
    output: {
        file: 'lib/index.client.cjs',
        format: 'cjs',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: ['react'],
    plugins: commonPlugins
},
    {
        input: 'lib/dts/index.client.d.ts',
        output: [{file: 'lib/index.client.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: [
            dts()
        ]
    }
]

const exportConfig = commonConfig.concat(serverConfig).concat(clientConfig)

export default exportConfig
