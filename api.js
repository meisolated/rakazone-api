import express, { json, urlencoded } from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import favicon from "serve-favicon"
import path from "path"
import { Cache } from "./cache/index.js"
import { scheduledTasks } from "./scheduledTasks.js"
scheduledTasks(Cache)
let port = 3000
let apiVersion = "v1"

import { fileURLToPath } from "url"
import { dirname } from "path"
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

/**
 * Response Success
 * @param {any} response - res obj
 * @param {any} data
 * @param {string} [message='Success']
 * @returns response
 */




function formatResponseSuccess(response, data, message = "Success", status = 200) {
    // define success response schema
    const responseData = {
        message,
        data,
    }
    return response.status(status).json(responseData)
}

const app = express()


app.use(favicon(path.join(__dirname, "assets", "logo.ico")))
app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())



app.use(`/api/${apiVersion}/streamerData`, async (req, res) => {
    formatResponseSuccess(res, { streamerData: Cache.get('streamerData') })
})

app.use(`/api/${apiVersion}/redirects`, async (req, res) => {
    formatResponseSuccess(res, { redirects: Cache.get('redirects') })
})

app.use(`/api/${apiVersion}/liveData`, async (req, res) => {
    formatResponseSuccess(res, { liveData: Cache.get('liveData') })
})

app.use(`/api/${apiVersion}/sortedVideos`, async (req, res) => {
    formatResponseSuccess(res, { sortedVideos: Cache.get('sortedVideos') })
})




app.use("/", async (req, res) => {
    res.status(404).json({ status: 404 })
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
    return
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
