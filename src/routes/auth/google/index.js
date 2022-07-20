import { formatResponseSuccess, formatResponseError } from "../../../helper/index.js"
import passport from "passport"
import "../../../lib/passport.js"
export default function (app, path) {
    app.get(path, async (req, res, next) => {
        try {
            passport.authenticate("google", { scope: ["profile", "email"], session: true })(req, res, next)
            // formatResponseSuccess(res, { sortedVideos: { data: "nothing" } })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
