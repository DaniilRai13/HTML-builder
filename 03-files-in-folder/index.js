const fsProm = require('fs/promises')
const fs = require("fs")
const path = require('path')

let pathToFolder = path.join(__dirname, 'secret-folder')

let checkFileInfo = async (pathToFolder) => {
    let files = await fsProm.readdir(pathToFolder, { withFileTypes: true })
    files.forEach(item => {
        if (item.isFile()) {
            let file = path.parse(`${pathToFolder}/${item.name}`);
            let pathToFile = path.join(pathToFolder, item.name)
            fs.stat(pathToFile, (err, stats) => {
                try {
                    console.log(file.name + " - " + file.ext.slice(1, file.ext.length - 1) + " - " + stats.size + " bytes")
                } catch (error) {
                    console.log("Иммеется ошибка: \n", error)
                }
            })
        }
        else{
            console.log(`${item.name} - не файл`)
        }

    })

}

checkFileInfo(pathToFolder)
