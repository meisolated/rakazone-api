import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { WatchLog } from "../models/WatchLog.model.js"

export default function (app, path) {
    app.post(path, async (req, res) => {
        // const forwarded = req.headers["x-forwarded-for"]
        // const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
        const { playing, muted, volume, ts, ct, vl, vi, platform, browser } = req.body
        if (
            typeof playing == undefined ||
            typeof muted == undefined ||
            typeof volume == undefined ||
            typeof ts == undefined ||
            typeof ct == undefined ||
            typeof vl == undefined ||
            typeof vi == undefined ||
            typeof platform == undefined ||
            typeof browser == undefined
        )
            return formatResponseError(res, { message: "Missing fields", status: 400 })
        try {

            WatchLog.create({ user_id: req.user ? req.user : 0, playing, muted, volume, ts, ct, vl, vi, platform, browser, timestamp: Date.now() })
            return formatResponseSuccess(res, {})
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}