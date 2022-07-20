import { formatResponseError } from "../helper/index.js"
export default function (req, res, next) {
    if (req.isAuthenticated() || req.user) {
        next()
    } else {
        formatResponseError(res, { message: "You are not logged in", code: 401 })
    }
}