import { Request, Response } from "express"
export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.get(path, async (req: Request, res: Response) => {
        return res.send({})
    })
}
