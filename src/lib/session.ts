import session from "express-session"
import config from "../config"

const testSoreFunction = (data: any) => {
    console.log(data)
}

interface sessionOps {
    key: string,
    secret: string,
    store: undefined,
    resave: boolean,
    saveUninitialized: boolean
}
const sessionOptions: sessionOps = {
    key: config.cookieKey,
    secret: config.cookieSecret,
    store: undefined,
    resave: false,
    saveUninitialized: false
}

export default session(sessionOptions)