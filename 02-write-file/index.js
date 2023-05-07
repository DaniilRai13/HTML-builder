let fs = require('fs')
let rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

process.on("exit", () => {
    console.log("Всего хорошего, до свидания!")
    writeStream.end('')
    rl.close()
})

let writeStream = fs.createWriteStream('./02-write-file/result.txt')
let writeTextInFile = (greetingText) => {
    rl.question(greetingText, inputText => {
        if (inputText === "exit") {
            writeStream.end('')
            process.exit()
        } else {
            writeStream.write(inputText + '\n')
            writeTextInFile('Напишите еще что-нибудь. Для выхода нажмите "CTRL+C" или введите "exit". \n')
        }
    })
}

writeTextInFile(`Введите текст, который будет записан в файл:\n`)



