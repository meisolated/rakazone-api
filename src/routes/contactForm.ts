import { Contact } from "../models"
import { _contact } from "../models/contact.model"
import { Request, Response } from "express"

export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.post(path, async (req: Request, res: Response) => {
        const { email, name, phone, subject, message }: _contact = req.body
        if (!email) return res.send({ message: "Invalid Request" })
        const timestamp = Date.now()
        Contact.create({
            email,
            name,
            phone,
            subject,
            message,
            status: "unread",
            reply: "no reply",
            timestamp: timestamp,
        })
            .then(() => {})
            .catch((e) => {
                console.log(e)
            })

        return res.json({})
    })
}
