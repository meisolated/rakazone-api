import { Contact } from "../models"
import { _contact } from "../models/contact.model"
import { Request, Response } from "express"
import { check, validationResult } from "express-validator"

export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.post(path, async (req: Request, res: Response) => {
        const { email, name, phone, subject, message }: _contact = req.body
        await check("email", "Please enter a valid email").isEmail().run(req)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const contact = new Contact({
            email,
            name,
            phone,
            subject,
            message,
            status: "unread",
            reply: "no reply",
        })
        await contact.save()
        res.json(contact)
    })
}
