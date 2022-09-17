import { Schema } from "mongoose"

interface streamerData {
    key: string
    value: string
    status: boolean
}

export default new Schema<streamerData>(
    {
        key: { type: String, required: true, unique: true },
        value: { type: String, required: true },
        status: { type: Boolean, required: true },
    },
    { timestamps: true }
)
