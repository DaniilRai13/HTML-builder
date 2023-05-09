let fs = require('fs')
let path = require('path')
let pathToFile = path.join('./02-write-file','result.txt')
let rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

process.on("exit", () => {
    console.log("Всего хорошего, до свидания!")
    writeStream.end('')
    rl.close()
})

let writeStream = fs.createWriteStream(pathToFile)
let writeTextInFile = (greetingText, pathToFile) => {
    rl.question(greetingText, inputText => {
        if (inputText === "exit") {
            writeStream.end('')
            process.exit()
        } else {
            fs.appendFile(pathToFile, `${inputText}\n`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            writeTextInFile('Напишите еще что-нибудь. Для выхода нажмите "CTRL+C" или введите "exit". \n', pathToFile)
        }
    })
}

writeTextInFile(`Введите текст, который будет записан в файл:\n`, pathToFile)



