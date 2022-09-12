import { Request, Response } from "express"
import videosLogic from "../logic/videos.logic"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const videos = await videosLogic(req.user)
        return res.send({ videos })
    })
}
