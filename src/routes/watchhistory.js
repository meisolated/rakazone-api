import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { Users } from "../models/Users.model.js"
import { Videos } from "../models/Videos.model.js"
import { WatchHistory } from "../models/WatchHistory.model.js"
export default function (app, path) {
    app.post(path, async (req, res) => {
        const { videoId } = req.body
        if (!req.user) return formatResponseError(res, { message: "You are not logged in", code: 401 })
        if (!videoId) return formatResponseError(res, { message: "Missing fields", status: 400 })
        try {
            const video = await Videos.findOne({ where: { videoId } })
            const user = await Users.findOne({ where: { user_id: req.user } })
            if (!video || !user) return formatResponseError(res, { message: "Invalid Request", status: 400 })
            const findHistory = await WatchHistory.findOne({ where: { user_id: user.id, video_id: video.id } })
            if (findHistory) return formatResponseError(res, { message: "You have already watched this video", status: 400 })
            await WatchHistory.create({ user_id: user.id, video_id: video.id, created_at: Date.now(), modified_at: Date.now() })
            return formatResponseSuccess(res, {})
        } catch (err) {
            console.log(err)
            formatResponseError(res, err)
        }
    })
}
