import { Schema } from "mongoose"

interface watchHistory {
    userId: string
    videoId: string
}

export default new Schema<watchHistory>(
    {
        userId: { type: String, required: true },
        videoId: { type: String, required: true },
    },
    { timestamps: true }
)
