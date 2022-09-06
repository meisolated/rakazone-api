import compression from "compression"
import cookieParser from "cookie-parser"
import "dotenv/config"
import express, { Express, json, Request, Response, urlencoded } from "express"
import fs from "fs"
import helmet from "helmet"
import logger from "morgan"
import passport from "passport"
import * as path from "path"
import config from "./config"
import HLSServer from "./lib/hls"
import LoadRoutes from "./lib/routesLoader"
import session from "./lib/session"
const directoryPath = path.join(__dirname, "/routes")
const app: Express = express()
const port = process.env.NODE_ENV == "dev" ? 5001 : 3001


app.use(helmet())
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(compression({ level: 9 }))
if (process.env.NODE_ENV == "dev") app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "1kb" }))
app.use(express.json({ limit: "1kb" }))


app.get("/", (_req: Request, res: Response) => {
    res.send({})
})

LoadRoutes(app, directoryPath, "api", false)

const server = app.listen(port, () => {
    console.log(`Server running on port http://localhost:` + port)
})


// FIXME: Find some way to replace provider or merge it with HLSServer
new HLSServer(server, {
    provider: {
        exists: (req: any, cb: any) => {
            const ext = req.url.split(".").pop()
            if (ext !== "m3u8" && ext !== "ts") {
                return cb(null, true)
            }

            fs.access(config.assetsDir + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log("File not exist")
                    return cb(null, false)
                }
                cb(null, true)
            })
        },
        getManifestStream: (req: any, cb: any) => {
            const stream = fs.createReadStream(config.assetsDir + req.url)
            cb(null, stream)
        },
        getSegmentStream: (req: any, cb: any) => {
            const stream = fs.createReadStream(config.assetsDir + req.url)
            cb(null, stream)
        },
    },
})

