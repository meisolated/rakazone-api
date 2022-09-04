import { Request, Response } from 'express'
import { Video } from '../models'
export default function (app: any, path: any) {
    console.log(`Loaded route: ${path}`)
    app.get(path, async (req: Request, res: Response) => {
        return res.send({ video: Video.find() })
    })
}