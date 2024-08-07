import compression from "compression"
import cookieParser from "cookie-parser"
import "dotenv/config"
import express, { json, urlencoded } from "express"
import fs from "fs"
import helmet from "helmet"
import logger from "morgan"
import passport from "passport"
import path, { dirname } from "path"
import favicon from "serve-favicon"
import { fileURLToPath } from "url"
import { sleep } from "./functions/funtions.js"
import middleware from "./helper/middleware.js"
// import { rateLimiterUsingThirdParty } from "./helper/rateLimiter.js"
import session from "./helper/session.js"
import hls from "./lib/hls/index.js"
import "./lib/passport.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const HLSfilesDir = "/home/isolated/rakazone/downloads"

let apiVersion = "v1"
let port = 3001
// https://expressjs.com/en/advanced/best-practice-performance.html
const app = express()
app.use(helmet())
// app.use(cookieSession({ name: "default", maxAge: 30 * 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_SECRET, process.env.COOKIE_SECRET2], }))
app.use(session)
// app.use(rateLimiterUsingThirdParty)
app.use(passport.initialize())
app.use(compression({ level: 9 }))
app.use(passport.session())
app.use(favicon(path.join(__dirname, "assets", "logo.ico")))
if (process.env.NODE_ENV == "dev") app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "1kb" }))
app.use(express.json({ limit: "1kb" }))
app.use(middleware)
// app.use(express.static("./assets/"))
app.use('/assets', express.static(path.join(__dirname, "assets")))

// Load Routes
const directoryPath = path.join(__dirname, "routes")
const listFolder = (folderPath) =>
    new Promise(async (resolve, reject) => {
        fs.readdir(folderPath, function (err, files) {
            if (err) {
                console.log(err)
            }
            files.forEach(async (file) => {
                if (file.includes(".js")) {
                    let route = `/${apiVersion}/` + `${folderPath}/${file}`.split("routes/")[1]
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
        resolve()
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
const server = app.listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.NODE_ENV} environment`))

// HLS
// use HLS Proxy https://github.com/meisolated/HLS-Proxy
new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split(".").pop()
            if (ext !== "m3u8" && ext !== "ts") {
                return cb(null, true)
            }

            fs.access(HLSfilesDir + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log("File not exist")
                    return cb(null, false)
                }
                cb(null, true)
            })
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(HLSfilesDir + req.url)
            cb(null, stream)
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(HLSfilesDir + req.url)
            cb(null, stream)
        },
    },
})


// if (process.env.NODE_ENV=== "production") {
//     https
//         .createServer({ cert: fs.readFileSync("cert/cert.pem"), key: fs.readFileSync("cert/key.pem") }, app)
//         .listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.ENV} environment`))
// } else {
//     app.listen(port, () => console.log(`Example app listening on port ${port} in ${process.env.ENV} environment`))
// }
