import { NextFunction, Request, Response } from "express"

export default function middleware(req: Request, res: Response, next: NextFunction) {
    if (req.path.includes("/session")) return next()
    if (!req.cookies.WC) return res.send({ message: "Invalid Request", code: 400 })
    next()
}
