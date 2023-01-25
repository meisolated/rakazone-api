import { Request, Response } from "express"

import { check, validationResult } from "express-validator"
import { EmailNewsletter } from "../models"
import { _emails } from "../models/emails.model"

export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.post(path, async (req: Request, res: Response) => {
        await check("email", "Please enter a valid email").isEmail().run(req)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Error with your email", status: "error", code: 406, errors: errors.array() })
        }
        const exitsAlready = await EmailNewsletter.exists({ email: req.body.email })
        if (exitsAlready) {
            res.json({
                message: "Already exists.",
                status: "success",
                code: 200,
            })
        } else {
            const email = new EmailNewsletter({
                email: req.body.email,
                subscribed: true,
            })
            await email.save()
            res.json({
                message: "Subscribed successfully.",
                status: "success",
                code: 200,
            })
        }
    })
}
