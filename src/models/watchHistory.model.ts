import { Schema } from "mongoose"

interface watchHistory {
    userId: string,
    videoId: string,
    createdAt: number,
    modifiedAt: number
}

export default new Schema<watchHistory>({
    userId: { type: String, required: true },
    videoId: { type: String, required: true },
    createdAt: { type: Number, required: true },
    modifiedAt: { type: Number, required: true },
})