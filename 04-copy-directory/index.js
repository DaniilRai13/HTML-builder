const fsProm = require("fs/promises")
const path = require("path")
const pathMain = path.join(__dirname, "files")
const pathTo = path.join(__dirname, "files-copy")

const copyDir = async (pathMain, pathTo) => {
    try {
        await deleteFiles(pathTo)
        console.log("Preparing start")
    } catch {
        console.log("Preparing start")
    }

    try {
        await copyFiles(pathMain, pathTo)
        console.log("Copying complited")
    }
    catch {
        console.log("Directory problems")
    }
}

const copyFiles = async (pathMain, pathTo) => {

    const mainFiles = await fsProm.readdir(pathMain, { withFileTypes: true });

    await fsProm.mkdir(pathTo, { recursive: true })

    for (let file of mainFiles) {
        if (file.isFile()) {
            await fsProm.copyFile(path.join(pathMain, file.name), path.join(pathTo, file.name))
        } else if (file.isDirectory()) {
            await fsProm.mkdir(path.join(pathTo, file.name))
            // console.log(yes)
        }

    }
}

const deleteFiles = async (pathTo) => {
    const files = await fsProm.readdir(pathTo, { withFileTypes: true });
    if (files.length === 0) {
        await fsProm.rmdir(pathTo);
        return;
    }
    for (let file of files) {
        if (file.isFile()) {
            await fsProm.unlink(path.join(pathTo, file.name));
        }
        else if(file.isDirectory()){
            await fsProm.rm(path.join(pathTo, file.name),{recursive:true})
        }
    }
    await fsProm.rmdir(pathTo);
}



copyDir(pathMain, pathTo)
