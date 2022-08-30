import { Request, Response, Router } from "express"
const router = Router()

router.get("/hello", (req: Request, res: Response) => {
    return res.json({ error: 404 })
})

export default router