import { Request, Response } from "express"
import { Emails } from "../models"
import { _emails } from "../models/emails.model"

export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.post(path, async (req: Request, res: Response) => {
        const { email }: _emails = req.body
        if (!email) return res.send({ message: "Invalid Request" })
        const timestamp = Date.now()
        Emails.create({
            email,
            timestamp: timestamp,
        })
            .then(() => {})
            .catch((e) => {
                console.log(e)
            })

        return res.json({})
    })
}
