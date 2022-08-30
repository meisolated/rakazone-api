import "dotenv/config"
import express, { Express, Request, Response } from "express"
import router from "./routes/hello"

const app = express()
const port = process.env.NODE_ENV == "dev" ? 5005 : 3005

app.get("/", (req: Request, res: Response) => {
    res.send({ nothing: "nothing" })
})
app.get("/hello", router)

app.listen(port, () => {
    console.log(`Server running on port` + port)
})

