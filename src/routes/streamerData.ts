import { Request, Response } from "express"
import { userProjection } from "../helpers"
import { StreamerData } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const results = await StreamerData.find({}, userProjection)
        return res.send({
            message: "Data fetched",
            status: "success",
            code: 200,
            results,
        })
    })
}
