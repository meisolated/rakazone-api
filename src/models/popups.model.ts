import { Schema } from "mongoose"

interface popups {
    title: string
    message: string
    closeBtnText: string
    closeBtnRedirect: string
    once: boolean
    expire: number
    status: boolean
}

export default new Schema<popups>({
    title: { type: String, required: true },
    message: { type: String, required: true },
    closeBtnText: { type: String, required: true },
    closeBtnRedirect: { type: String, required: true },
    once: { type: Boolean, required: true },
    expire: { type: Number, required: true },
    status: { type: Boolean, required: true },
})
