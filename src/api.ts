import compression from "compression"
import cookieParser from "cookie-parser"
import "dotenv/config"
import express, { Express, json, Request, Response, urlencoded } from "express"
import LoadRoutes from "lib/routesLoader"
import securityHeader from "lib/securityHeaders"
import logger from "morgan"
import passport from "passport"
import path from "path"

const directoryPath = path.join(__dirname, "/routes")
const app = express()
const port = process.env.NODE_ENV == "dev" ? 5001 : 3001


app.use(securityHeader)
app.use(passport.initialize())
app.use(compression())
app.use(passport.session())
if (process.env.NODE_ENV == "dev") app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "1kb" }))
app.use(express.json({ limit: "1kb" }))
app.get("/", (req: Request, res: Response) => {
    res.send({ nothing: "nothing" })
})
LoadRoutes(app, directoryPath, "nothing", true)
app.listen(port, () => {
    console.log(`Server running on port` + port)
})
