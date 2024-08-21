import {buildPackage} from './build.mjs'

async function publishNpm() {
    await buildPackage()

}

await publishNpm()
