import compression from "compression"
import cookieParser from "cookie-parser"
import "dotenv/config"
import express, { Express, json, Request, Response, urlencoded } from "express"
import helmet from "helmet"
import http from "http"
import logger from "morgan"
import passport from "passport"
import * as path from "path"
import config from "./config"
import HLSServer from "./lib/hls"
import middleware from "./lib/middleware"
import LoadRoutes from "./lib/routesLoader"
import session from "./lib/session"

const routesDirPath = path.join(__dirname, "/routes")
const app: Express = express()
const port = process.env.BUILD_TYPE == "dev" ? 5001 : 3001

app.use(helmet())
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(compression({ level: 9 }))
if (process.env.BUILD_TYPE == "dev") app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "1kb" }))
app.use(express.json({ limit: "1kb" }))
app.use(middleware)
app.use("/assets", express.static(config.assetsDir, { maxAge: 60 * 60 * 24 * 30 }))
app.use("/thumbnails", express.static(config.thumbnailsDir, { maxAge: 60 * 60 * 24 * 30 }))
app.get("/", (_req: Request, res: Response) => {
    res.send({ message: "Something is missing over here", code: 200 })
})
LoadRoutes(app, routesDirPath, "api", true)
    .then(() => {
        app.use("/watch", (req, res, next) => HLSServer(req, res, next, { hlsDir: config.videosDir }))

        app.listen(port, () => {
            console.log(`Server running on port http://localhost:` + port)
        })
    })
    .catch((e: any) => {
        throw new Error(e)
    })


/** -------------------------------------------------------------------------------------------------- 
 * @videos these videos are gonna be based on user or session history.
 *
 * content : get {popups,streamerData,videos}
 * session : get if token ? {check expiry if expired allot new one and set cookie} : verify and return
 * analytics : post {ip_address ,referrer, page, and some other data }
 * logout : get request remove session and remove cookie
 * redirects : get (return with redirects from database)
 * streamerData : get (return streamerData from database)
 * userData : get (use session from cookie if user exists return user data from database else not logged in )
 * videoData : post (videoId) => get data from videos Database return video Data if exists
 * watchHistory : post (videoId and user session)=> validate user and add video to user history if doesn't exists
 * !watchLog : currently not using this
 * *auth already done
    --------------------------------------------------------------------------------------------------
 */
