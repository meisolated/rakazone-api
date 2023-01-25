import { Request, Response } from "express"
import { check, validationResult } from "express-validator"
import { ContactForm } from "../models"
import { _contactForm } from "../models/contact.model"

export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.post(path, async (req: Request, res: Response) => {
        const { email, name, phone, subject, message }: _contactForm = req.body
        await check("email", "Please enter a valid email").isEmail().run(req)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Error with data provided", status: "error", code: 406, errors: errors.array() })
        }
        const contact = new ContactForm({
            email,
            name,
            phone,
            subject,
            message,
            status: "unread",
            reply: "no reply",
        })
        await contact.save()
        res.json({
            message: "Message submitted successfully.",
            status: "success",
            code: 200,
        })
    })
}
