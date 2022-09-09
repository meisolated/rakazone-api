import { Schema } from "mongoose"

interface serverSettings {
    key: string
    value: string
    status: boolean
}

export default new Schema<serverSettings>({
    key: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: Boolean, required: true },
})
