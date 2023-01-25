import { Request, Response } from "express"
import { userProjection } from "../helpers"
import { Videos, WatchHistory } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const query = req.body.query
        if (!req.user) return res.send({ message: "You're not logged In", code: 401, status: "error" })
        if (!query) return res.send({ message: "Invalid Request", code: 400, status: "error" })

        // GET
        if (query == "get") {
            const userHistory = await WatchHistory.find({ userId: req.user }, userProjection)
            const videoId: Array<String> = userHistory.map((v) => v.videoId)
            const videoData = await Videos.find({ videoId }, { ...userProjection, createdAt: false, updatedAt: false })
            const history = { history: userHistory, videoData }
            if (!history) return res.send({ message: "Nothing to show, because you didn't watch anything :(", code: 404, status: "error" })
            return res.send({ message: "Data fetched", status: "success", code: 200, ...history })
        }
        // POST
        else if (query == "post") {
            if (!req.body.videoId) return res.send({ message: "Invalid Request", code: 400 })
            const vD = await Videos.find({ videoId: req.body.videoId })
            if (!vD) return res.send({ message: "Invalid Request", code: 400, status: "error" })
            WatchHistory.create({ videoId: req.body.videoId, userId: req.user })
            return res.send({ message: "Added to db", code: 200, status: "success" })
        } else {
            return res.send({ message: "Such a dumb request", code: 400, status: "error" })
        }
    })
}
