import { Schema } from 'mongoose'
interface sessions {
    _id: string,
    expires: any,
    data: object
}

export default new Schema<sessions>({
    _id: { type: String, required: true },
    expires: { type: String, required: true },
    data: { type: Object, required: true }
})