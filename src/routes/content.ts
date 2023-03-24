import { Request, Response } from "express"
import { userProjection } from "../helpers"
import videosLogic from "../logic/videos.logic"
import { Live, StreamerData } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        try {
            const videos = await videosLogic(req.user)
            const streamerData = await StreamerData.find({}, userProjection)
            const live = await Live.find({}, userProjection)
            const ts = Date.now()
            return res.send({ videos, streamerData, live, ts })
        } catch (error) {
            console.log(error)
            return res.send({ code: 500, message: "Server Error" })
        }
    })
}
