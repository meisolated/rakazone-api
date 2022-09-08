import { Schema } from "mongoose"

interface visitorLog {
    ip: string,
    city: string,
    region: string,
    country: string,
    postal: string,
    timezone: string,
    ispAddress: string,
    timestamp: string,
    reqType: string
}

export default new Schema<visitorLog>({
    ip: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, required: true },
    postal: { type: String, required: true },
    timezone: { type: String, required: true },
    ispAddress: { type: String, required: true },
    reqType: { type: String, required: true },
})

