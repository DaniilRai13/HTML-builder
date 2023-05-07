const fs = require('fs')
const path = require('node:path');

fs.readFile('./01-read-file/text.txt', "utf-8", (e, data) => {
    if (e) {
        console.log("File is note open")
    } else {
        console.log(data.trim())
    }
})