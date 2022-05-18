import { formatResponseSuccess, formatResponseError } from "../../../helper/index.js"
import passport from "passport"
import "../../../lib/passport.js"
export default function (app, path) {
    app.get(path, async (req, res, next) => {
        passport.authenticate("google", { successRedirect: "http://localhost:3000/", failureRedirect: "/api/v1/loginError", session: true })(req, res, next)
    })
}
