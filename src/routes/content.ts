import { Request, Response } from "express"
import { userProjection } from "../helpers"
import videosLogic from "../logic/videos.logic"
import { Live, StreamerData } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const videos = await videosLogic(req.user)
        const streamerdata = await StreamerData.find({}, userProjection)
        const live = await Live.find({}, userProjection)
        return res.send({ videos, streamerdata, live })
    })
}
