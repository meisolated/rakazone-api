import { Schema } from 'mongoose'
interface session {
    _id: string,
    expires: any,
    data: object
}

export default new Schema<session>({
    _id: { type: String, required: true },
    expires: { type: String, required: true },
    data: { type: Object, required: true }
})