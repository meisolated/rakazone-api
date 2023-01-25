import { Request, Response } from "express"
import { Users } from "../models"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        const findUser = await Users.find({ userId: req.user })
        if (findUser)
            return res.send({
                message: "Data fetched",
                status: "success",
                code: 200,
                user: findUser,
            })
        return res.send({
            status: "success",
            code: 200,
            message: "User not logged In",
        })
    })
}
