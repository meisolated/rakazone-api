import { Request, Response } from "express"
import { StreamerData } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const results = await StreamerData.find()
        return res.send({ results })
    })
}
