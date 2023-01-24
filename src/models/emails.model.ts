import { Schema } from "mongoose"

export interface _emails {
    email: string
}

export default new Schema<_emails>(
    {
        email: { type: String, required: true },
    },
    { timestamps: true }
)
