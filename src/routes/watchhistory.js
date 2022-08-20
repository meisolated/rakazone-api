import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { Sessions } from "../models/Sessions.model.js"
import { Users } from "../models/Users.model.js"
import { Videos } from "../models/Videos.model.js"
import { WatchHistory } from "../models/WatchHistory.model.js"
export default function (app, path) {
    app.post(path, async (req, res) => {
        const { sessionId, videoId } = req.body
        if (!sessionId || !videoId) return formatResponseError(res, { message: "Missing fields", status: 400 })
        try {
            const video = await Videos.findOne({ where: { videoId } })
            const session = await Sessions.findOne({ where: { session_id: sessionId } })
            if (!session) return formatResponseError(res, { message: "Session not found", status: 404 })
            const data = JSON.parse(session.data)
            const user = await Users.findOne({ where: { user_id: data.passport.user } })
            if (!video || !user) return formatResponseError(res, { message: "Invalid Request", status: 400 })

            const watchHistory = await WatchHistory.create({ user_id: user.id, video_id: video.id, created_at: Date.now(), modified_at: Date.now() })
            return formatResponseSuccess(res, { watchHistory })
        } catch (err) {
            console.log(err)
            formatResponseError(res, err)
        }
    })
}
