import express, { json, urlencoded } from "express"
import { sleep } from "./functions/funtions.js"
import cookieParser from "cookie-parser"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import favicon from "serve-favicon"
import passport from "passport"
import logger from "morgan"
import helmet from "helmet"
import "./lib/passport.js"
import https from "https"
import "dotenv/config"
import fs from "fs"
import session from "./helper/session.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
let apiVersion = "v1"
let port = 3001


const app = express()
app.use(helmet())
// app.use(cookieSession({ name: "default", maxAge: 30 * 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_SECRET, process.env.COOKIE_SECRET2], }))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(favicon(path.join(__dirname, "assets", "logo.ico")))
app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "1kb" }))
app.use(express.json({ limit: "1kb" }))



// Load Routes
const directoryPath = path.join(__dirname, "routes")
const listFolder = (folderPath) =>
    new Promise(async (reslove, reject) => {
        fs.readdir(folderPath, function (err, files) {
            if (err) {
                console.log(err)
            }
            files.forEach(async (file) => {
                if (file.includes(".js")) {
                    let route = `/api/${apiVersion}/` + `${folderPath}/${file}`.split("routes/")[1]
                    route = route.split(".js")[0]
                    route = route.includes("index") ? route.split("index")[0] : route
                    console.log(`Loading route: ${route}`)
                    await import(`${folderPath}/${file}`).then((fun) => fun.default(app, route))
                } else {
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
app.listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.ENV} environment`))

// if (process.env.ENV === "production") {
//     https
//         .createServer({ cert: fs.readFileSync("cert/cert.pem"), key: fs.readFileSync("cert/key.pem") }, app)
//         .listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.ENV} environment`))
// } else {
//     app.listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.ENV} environment`))
// }
