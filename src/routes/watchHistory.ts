import { Request, Response } from "express"
import { userProjection } from "../helpers"
import { Videos, WatchHistory } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const query = req.body.query
        req.user = "111101904428416096409"
        if (!req.user) return res.send({ message: "You're not logged In", code: 401 })
        if (!query) return res.send({ message: "Invalid Request", code: 400 })
        const userHistory = await WatchHistory.find({ userId: req.user }, userProjection)
        const videoId: Array<String> = userHistory.map(v => v.videoId)
        const videoData = await Videos.find({ videoId }, { ...userProjection, createdAt: false, updatedAt: false })
        const history = { history: userHistory, videoData }
        if (!history) return res.send({ message: "Nothing to show, because you didn't watch anything :(", code: 404 })
        if (query == "get") return res.send({ ...history })
        if (query == "post") {
            if (!req.body.videoId) return res.send({ message: "Invalid Request", code: 400 })
            WatchHistory.create({ videoId: req.body.videoId, userId: req.user, })
            return res.send({ message: "done", code: 200 })
        }
        return res.send({})
    })
}
