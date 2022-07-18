import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { Videos } from "../models/Videos.model.js"

export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            res.set("Cache-control", "public, max-age=300")
            const videoData = await Videos.findOne({ where: { videoId: req.query.videoId } })
            if (!videoData) return formatResponseError(res, { message: "Video not found" })
            return formatResponseSuccess(res, { ...videoData.dataValues })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
