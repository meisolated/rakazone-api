import { Schema } from 'mongoose'

export interface user {
    userId: string,
    loginType: string,
    name: string,
    email: string,
    profilePic: string,
    createdOn: number,
    lastLogin: number,
    status: boolean
}

export default new Schema<user>({
    userId: { type: String, required: true },
    loginType: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: { type: String, required: true },
    createdOn: { type: Number, required: true },
    lastLogin: { type: Number, required: true },
    status: { type: Boolean, required: true },

})
