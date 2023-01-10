import { Schema } from "mongoose"

export interface _youtubeAPI {
    key: string
    utilization: number
}

export default new Schema<_youtubeAPI>(
    {
        key: { type: String, required: true },
        utilization: { type: Number, required: true },
    },
    { timestamps: true }
)
