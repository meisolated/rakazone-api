import passport from "passport"
import config from "../../../config"
import "../../../lib/passport"
export default function (app: any, path: any) {
    app.get(path, async (req: any, res: any, next: any) => {
        passport.authenticate("google", {
            successRedirect: config.googleAuthSuccessURL,
            failureRedirect: "/internal_api/v1/loginError",
            session: true,
        })(req, res, next)
    })
}
