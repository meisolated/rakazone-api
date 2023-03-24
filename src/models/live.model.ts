import { Schema } from "mongoose"

interface live {
    platform: string
    videoId: string
    title: string
    viewersCount: number
    publishedAt: number
    status: boolean
    lastUpdate: number
}

export default new Schema<live>(
    {
        platform: { type: String, required: true },
        videoId: { type: String, required: true },
        title: { type: String, required: true },
        viewersCount: { type: Number, required: true },
        publishedAt: { type: Number, required: true },
        status: { type: Boolean, required: true },
        lastUpdate: { type: Number, required: true },
    },
    { timestamps: true }
)
