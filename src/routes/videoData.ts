import { Request, Response } from "express"
import { Videos } from "../models"
export default function (app: any, path: any) {
   console.log("Loaded route: " + path)
   app.get(path, async (req: Request, res: Response) => {
      if (!req.body.videoId) return res.send({ message: "Invalid Request", code: 400 })
      const findVideo = await Videos.find({ videoId: req.body.videoId })
      if (findVideo) return res.send({ video: findVideo })
      return res.send({ message: "Video not found", code: 404 })
   })
}
