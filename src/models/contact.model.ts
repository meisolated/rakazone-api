import { Schema } from "mongoose"

export interface _contact {
    //email , name , phone , subject , message
    email: string
    name: string
    phone: number
    subject: string
    message: string
}

export default new Schema<_contact>(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
)
