import { Schema } from 'mongoose'
interface session {
    sessionId: string,
    expires: number,
    data: object
}

export default new Schema<session>({
    sessionId: { type: String, required: true },
    expires: { type: Number, required: true },
    data: { type: Object, required: true }
})