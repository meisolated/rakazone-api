import { Request, Response } from "express"
import { Redirects } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const redirects = await Redirects.find()
        return res.send({
            message: "Data fetched",
            status: "success",
            code: 200,
            redirects,
        })
    })
}
