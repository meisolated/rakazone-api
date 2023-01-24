import { Schema } from "mongoose"

export interface _emails {
    email: string
    subscribed: boolean
}

export default new Schema<_emails>(
    {
        email: { type: String, required: true },
        subscribed: { type: Boolean, required: true },
    },
    { timestamps: true }
)
