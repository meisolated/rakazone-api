import cors from "cors"

const corsOptions = {
    origin: 'http://raka.zone',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export default cors(corsOptions)