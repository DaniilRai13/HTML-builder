const { writeFile } = require("fs")
let fsProm = require("fs/promises")
let path = require("path")
let pathToStyles = path.join("./05-merge-styles","styles")
let pathToBundel = path.join("./05-merge-styles","project-dist","bundle.css")

let bundle = async (pathToStyles) => {
    let styles = await fsProm.readdir(pathToStyles, { withFileTypes: true })
    let cssInner = ''

    for (let style of styles) {

        let pathToStyle = path.join(pathToStyles, style.name)
        let file = path.parse(pathToStyle)
        
        if (file.ext === ".css" && style.isFile()) {
            cssInner += await fsProm.readFile(pathToStyle)
        }

    }
    await fsProm.writeFile(pathToBundel, cssInner)
    // let writeStream = fs.createWriteStream(pathToBundel)
    // writeStream.write(cssInner + "\n")
}

bundle(pathToStyles)