import {$} from 'zx'
import path from 'path'
import fs from 'fs'
import pkg from '../package.json' with {type: 'json'}

export async function buildPackage() {
    // 首先执行rollup打包
    await $`npx rollup --config rollup.config.mjs`

    const selfPath = process.cwd()
    const buildPath = path.join(selfPath, 'build')
    if (fs.existsSync(buildPath)) {
        await fs.rmSync(buildPath, {recursive: true})
    }
    const targetLibPath = path.join(buildPath, 'lib')
    fs.mkdirSync(targetLibPath, {recursive: true})
    fs.cpSync(path.join(selfPath, 'lib'), targetLibPath, {recursive: true})
    // 删除多余的dts目录
    fs.rmSync(path.join(targetLibPath, 'dts'), {recursive: true})

    pkg.devDependencies = {}
    const newPkg = JSON.stringify(pkg, null, 2)
    fs.writeFileSync(path.join(buildPath, 'package.json'), newPkg)
}

await buildPackage()
