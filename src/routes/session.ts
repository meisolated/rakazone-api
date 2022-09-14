import crypto from "crypto"
import { Request, Response } from "express"
import { Sessions } from "../models"


export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const forwarded = req.headers["x-real-ip"]
        // @ts-ignore
        const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
        if (!ip) return res.send({ message: "Invalid Request", code: 400 })
        if (req.cookies.WC) return res.send({ message: "You're in Good Zone" })
        const now = Date.now()
        const randomSession = crypto.randomBytes(32).toString("hex")
        res.cookie("WC", randomSession, { maxAge: 30 * 24 * 60 * 60, httpOnly: true })
        Sessions.create({ _id: randomSession, expires: now + 30 * 24 * 60 * 60, data: { type: "local", ip: ip } })
        return res.send({})
    })
}
