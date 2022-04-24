import express, { json, urlencoded } from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import { GetLiveData, GetRedirectList, GetUserData } from "./database/db_functions.js"
import main from "./updaters.js"
import favicon from "serve-favicon"
import path from "path"

import { fileURLToPath } from "url"
import { dirname } from "path"
import { getSortedVideos } from "./handler/dataFetcher.js"
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

var data = { livedata: {}, userdata: {}, redirectdata: {}, somevideos: {} }
setTimeout(async () => {
    await main()
    data["livedata"] = await GetLiveData()
    data["userdata"] = await GetUserData()
    data["redirectdata"] = await GetRedirectList()
    data["somevideos"] = await getSortedVideos()
}, 30000)

/**
 * Response Success
 * @param {any} response - res obj
 * @param {any} data
 * @param {string} [message='Success']
 * @returns response
 */
export function formatResponseSuccess(response, data, message = "success", status = 200) {
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

app.use("/api/v1/livedata", async (req, res) => {
    formatResponseSuccess(res, data["livedata"])
})

app.use("/api/v1/redirectdata", async (req, res) => {
    formatResponseSuccess(res, data["redirectdata"])
})

app.use("/api/v1/userdata", async (req, res) => {
    formatResponseSuccess(res, data["userdata"])
})
app.use("/api/v1/somevideos", async (req, res) => {
    formatResponseSuccess(res, data["somevideos"])
})

app.use("/api/v1/all", async (req, res) => {
    formatResponseSuccess(res, { livedata: data["livedata"], userdata: data["userdata"], somevideos: data["somevideos"] })
})




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
    return
})

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
