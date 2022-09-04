import { Schema } from 'mongoose'
export interface video {
    videoId: string,
    platform: string,
    thumbnail: string,
    title: string,
    type: string,
    publishedAt: number,
    duration: number,
    viewCount: number,
    localViews: number,
    likeCount: number,
    commentCount: number,
    status: boolean
}

export default new Schema<video>({
    videoId: { type: String, required: true },
    platform: { type: String, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    publishedAt: { type: Number, required: true },
    duration: { type: Number, required: true },
    viewCount: { type: Number, required: true },
    localViews: { type: Number, required: true },
    likeCount: { type: Number, required: true },
    commentCount: { type: Number, required: true },
    status: { type: Boolean, required: true },

})
