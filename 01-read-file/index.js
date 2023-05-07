const fs = require('fs')

let readingFile = (pathToFile) => {
    let readStream = fs.ReadStream(pathToFile, { encoding: "utf-8" })
    readStream.on("data", (data) => {
        console.log(data.trim())
    })
}


readingFile('./01-read-file/text.txt')
