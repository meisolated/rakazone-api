import { Schema } from "mongoose"

interface redirects {
    fromWhere: string
    toWhere: string
}

export default new Schema<redirects>({
    fromWhere: { type: String, required: true },
    toWhere: { type: String, required: true },
})
