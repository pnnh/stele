import commonjs from '@rollup/plugin-commonjs'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' with {type: 'json'}
import sass from 'rollup-plugin-sass';
import {writeFileSync} from "node:fs";
import alias from "@rollup/plugin-alias";
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import postcss from "postcss";
import css from "rollup-plugin-import-css";
import replace from '@rollup/plugin-replace'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commonPlugins = [
    commonjs(),
    nodeResolve({}),
    json(),
    alias({
        entries: [
            {find: '@', replacement: path.resolve(__dirname, 'src')},
        ]
    }),
    replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion: 15,
        '@': path.resolve(__dirname, 'src')
    }),
    typescript({
        tsconfig: 'tsconfig.json',
    }),
    sass({
        output: 'lib/assets/index.css',
    }),
    strip({
        include: ['**/*.(js|mjs|ts|tsx)'],
        debugger: true,
        functions: ['console.log', 'console.debug'],
        sourceMap: true
    }),
    terser()
]
const commonExternal = [
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
    ...(pkg.devDependencies ? Object.keys(pkg.devDependencies) : [])
]

const dtsPlugins = [
    alias({
        entries: [
            {find: '@', replacement: path.resolve(__dirname, 'src')},
        ]
    }),
    dts()
]

let commonConfig = [{
    strictDeprecations: true,
    input: 'src/index.common.tsx',
    output: {
        file: 'lib/index.common.mjs',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: [
        del({targets: 'lib/*'}),

        ...commonPlugins]
},
    {
        input: 'src/index.common.tsx',
        output: {
            file: 'lib/index.common.cjs',
            format: 'cjs',
            sourcemap: true,
            assetFileNames: '[name][extname]'
        },
        external: commonExternal,
        plugins: commonPlugins
    },
    {
        input: 'lib/dts/index.common.d.ts',
        output: [{file: 'lib/index.common.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: dtsPlugins
    }
]

const serverConfig = [{
    input: 'src/index.server.tsx',
    output: {
        file: 'lib/index.server.mjs',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
}, {
    input: 'src/index.server.tsx',
    output: {
        file: 'lib/index.server.cjs',
        format: 'cjs',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
},
    {
        input: 'lib/dts/index.server.d.ts',
        output: [{file: 'lib/index.server.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: dtsPlugins
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
    external: commonExternal,
    plugins: commonPlugins
}, {
    input: 'src/index.client.tsx',
    output: {
        file: 'lib/index.client.cjs',
        format: 'cjs',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
},
    {
        input: 'lib/dts/index.client.d.ts',
        output: [{file: 'lib/index.client.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: dtsPlugins
    }
]

const exportConfig = commonConfig.concat(serverConfig).concat(clientConfig)

export default exportConfig
