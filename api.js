import { GetStreamerData } from "./handler/GetStreamerData.js"
import { GetSortedVideos } from "./handler/GetSortedVideos.js"
import { GetRedirects } from "./handler/GetRedirects.js"
import { GetLiveData } from "./handler/GetLiveData.js"
import express, { json, urlencoded } from "express"
import cookieParser from "cookie-parser"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import favicon from "serve-favicon"
import logger from "morgan"
import helmet from "helmet"
import https from "https"
import fs from "fs"
import "dotenv/config"
import { sleep } from "./functions/funtions.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
let apiVersion = "v1"
app.use(helmet())
let port = 3001


app.use(favicon(path.join(__dirname, "assets", "logo.ico")))
app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())


// Load Routes
const directoryPath = path.join(__dirname, 'routes')
const listFolder = (folderPath) => new Promise(async (reslove, reject) => {

    fs.readdir(folderPath, function (err, files) {
        if (err) {
            console.log(err)
        }
        files.forEach(async (file) => {
            if (file.includes('.js')) {
                let route = `/api/${apiVersion}/` + `${folderPath}/${file}`.split("routes/")[1]
                route = route.split(".js")[0]
                route = route.includes("index") ? route.split("index")[0] : route
                console.log(`Loading route: ${route}`)
                await import(`${folderPath}/${file}`).then(fun => fun.default(app, route))
            }
            else {
                listFolder(`${folderPath}/${file}`)
            }
        })
    })
    await sleep(5000)
    reslove()
})
await listFolder(directoryPath)


app.use("/", async (req, res) => {
    res.status(404).json({ status: 404 })
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
    return
})

if (process.env.ENV === "production") {
    https.createServer({ cert: fs.readFileSync("cert/cert.pem"), key: fs.readFileSync("cert/key.pem") }, app).listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.ENV} environment`))
} else {
    app.listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.ENV} environment`))
}
// https.createServer({ cert: fs.readFileSync("cert/cert.pem"), key: fs.readFileSync("cert/key.pem") }).listen(port, () => console.log(`Example app listening on port ${port}!`))
