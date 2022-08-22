import passport from "passport"
import { formatResponseError, formatResponseSuccess } from "../../../helper/index.js"
import "../../../lib/passport.js"
export default function (app, path) {
    app.get(path, async (req, res, next) => {
        passport.authenticate("google", { successRedirect: "https://keviv.xyz/", failureRedirect: "/internal_api/v1/loginError", session: true })(req, res, next)
    })
}
