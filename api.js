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

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
let apiVersion = "v1"
app.use(helmet())
let port = 3001

/**
 * Response Success
 * @param {any} response - res obj
 * @param {any} data
 * @param {string} [message='Success']
 * @returns response
 */
function formatResponseSuccess(response, data, message = "success", status = 200) {
    const responseData = { message, data }
    return response.status(status).json(responseData)
}

app.use(favicon(path.join(__dirname, "assets", "logo.ico")))
app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

// app.use(`/api/${apiVersion}/streamerData`, async (req, res) => {
//     formatResponseSuccess(res, { streamerData: await GetStreamerData() })
// })

// app.use(`/api/${apiVersion}/redirects`, async (req, res) => {
//     formatResponseSuccess(res, { redirects: await GetRedirects() })
// })

// app.use(`/api/${apiVersion}/liveData`, async (req, res) => {
//     formatResponseSuccess(res, { liveData: await GetLiveData() })
// })

// app.use(`/api/${apiVersion}/sortedVideos`, async (req, res) => {
//     formatResponseSuccess(res, { sortedVideos: await GetSortedVideos() })
// })

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
