import { Schema } from "mongoose"

interface watchLog {
    userId: string
    playing: boolean
    muted: boolean
    volume: number
    ts: number
    ct: number
    vl: number
    vi: string
    platform: string
    browser: string
}

export default new Schema<watchLog>(
    {
        userId: { type: String, required: true },
        playing: { type: Boolean, required: true },
        muted: { type: Boolean, required: true },
        volume: { type: Number, required: true },
        ts: { type: Number, required: true },
        ct: { type: Number, required: true },
        vl: { type: Number, required: true },
        vi: { type: String, required: true },
        platform: { type: String, required: true },
        browser: { type: String, required: true },
    },
    { timestamps: true }
)
