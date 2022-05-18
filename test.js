//requiring path and fs modules
import fs from 'fs'
import path, { dirname } from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const directoryPath = path.join(__dirname, 'routes')

const listFolder = (folderPath) => {
    fs.readdir(folderPath, function (err, files) {
        if (err) {
            console.log(err)
        }
        files.forEach((file) => {
            if (file.includes('.js')) {
                import(`${folderPath}/${file}`).then(fun => fun.default("app"))
            }
            else {
                listFolder(`${folderPath}/${file}`)
            }
        })
    })
}


fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log(err)
    }
    files.forEach((file) => {
        if (file.includes('.js')) {
            import(`./routes/${file}`).then(fun => fun.default("app"))
        }
        else {
            listFolder(`./routes/${file}`)
        }
    })
})