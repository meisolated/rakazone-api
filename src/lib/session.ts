import MongoStore from "connect-mongo"
import session from "express-session"
import config from "../config"
interface sessionOps {
    key: string
    secret: string
    store: session.Store
    resave: boolean
    saveUninitialized: boolean
}
const sessionOptions: sessionOps = {
    key: config.cookieKey,
    secret: config.cookieSecret,
    store: MongoStore.create({
        mongoUrl: config.mongoUri,
    }),
    resave: false,
    saveUninitialized: false,
}

export default session(sessionOptions)
