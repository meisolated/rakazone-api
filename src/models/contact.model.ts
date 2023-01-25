import { Schema } from "mongoose"

export interface _contactForm {
    //email , name , phone , subject , message , status , reply
    email: string
    name: string
    phone: string
    subject: string
    message: string
    status: string
    reply: string
}

export default new Schema<_contactForm>(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        status: { type: String, required: true },
        reply: { type: String, required: true },
    },
    { timestamps: true }
)
