import { formatResponseSuccess, formatResponseError } from "../../../helper/index.js"
import passport from "passport"
import "../../../lib/passport.js"
export default function (app, path) {
    app.get(path, async (req, res, next) => {
        passport.authenticate("google", { successRedirect: "/api/v1/liveData", failureRedirect: "/api/v1/liveData", session: true })(req, res, next)
    })
}
