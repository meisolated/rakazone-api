import { Request, Response } from "express"
import { Videos } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        if (!req.body.query) return res.json({ message: "Invalid request" })
        const results = await Videos.find({ $text: { $search: req.body.query } })
        return res.send({ results })
    })
}
