import { Request, Response } from "express"

import { check, validationResult } from "express-validator"
import { Emails } from "../models"
import { _emails } from "../models/emails.model"

export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.post(path, async (req: Request, res: Response) => {
        await check("email", "Please enter a valid email").isEmail().run(req)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const email = new Emails({
            email: req.body.email,
            subscribed: true,
        })
        await email.save()
        res.json(email)
    })
}
