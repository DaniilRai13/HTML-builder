let fsProm = require("fs/promises")
let path = require("path")
let pathMain = path.join(__dirname, "files")
let pathTo = path.join(__dirname, "files-copy")

let copyDir = async (pathMain, pathTo) => {
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

let copyFiles = async (pathMain, pathTo) => {

    let mainFiles = await fsProm.readdir(pathMain, { withFileTypes: true });

    await fsProm.mkdir(pathTo, { recursive: true })

    for (let file of mainFiles) {
        await fsProm.copyFile(path.join(pathMain, file.name), path.join(pathTo, file.name))
    }
}

let deleteFiles = async (pathTo) => {
    let files = await fsProm.readdir(pathTo, { withFileTypes: true });
    if (files.length === 0) {
        await fsProm.rmdir(pathTo);
        return;
    }
    for (let file of files) {
        await fsProm.unlink(path.join(pathTo, file.name));
    }
    await fsProm.rmdir(pathTo);
}



copyDir(pathMain, pathTo)
