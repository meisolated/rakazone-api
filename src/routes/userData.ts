import { Request, Response } from "express"
import { Users } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const findUser = await Users.find({ userId: req.user })
        if (findUser) res.send({ user: findUser })
        return res.send({ message: "User not logged In" })
    })
}
