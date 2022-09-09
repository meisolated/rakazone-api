import { Schema } from "mongoose"

interface analytics {
    ip: string
    city: string
    region: string
    country: string
    postal: string
    timezone: string
    ispAddress: string
    page: string
    referrer: string
    deviceWidth: number
    deviceHeight: number
    deviceName: string
    deviceColorDepth: number
    deviceOSName: string
    deviceOSVersion: string
    browserName: string
    browserVersion: string
    browserWidth: number
    browserHeight: number
}

export default new Schema<analytics>({
    ip: { type: String, required: true },
    city: { type: String, required: false },
    region: { type: String, required: false },
    country: { type: String, required: false },
    postal: { type: String, required: false },
    timezone: { type: String, required: false },
    ispAddress: { type: String, required: false },
    page: { type: String, required: false },
    referrer: { type: String, required: false },
    deviceWidth: { type: Number, required: false },
    deviceHeight: { type: Number, required: false },
    deviceName: { type: String, required: false },
    deviceColorDepth: { type: Number, required: false },
    deviceOSName: { type: String, required: false },
    deviceOSVersion: { type: String, required: false },
    browserName: { type: String, required: false },
    browserVersion: { type: String, required: false },
    browserWidth: { type: Number, required: false },
    browserHeight: { type: Number, required: false },
})
