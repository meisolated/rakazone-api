import { NextFunction, Request, Response } from "express"

export default function middleware(req: Request, res: Response, next: NextFunction) {
    const forwarded = req.headers["x-real-ip"]
    // @ts-ignore
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    if (!ip) return res.send({ message: "Ummm I would say nice try", code: 406 })
    if (req.path.includes("/session")) return next()
    if (!req.cookies.WC) return res.send({ message: "Invalid Request", code: 400 })
    next()
}
