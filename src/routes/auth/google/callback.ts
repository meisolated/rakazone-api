import passport from "passport"
import "../../../lib/passport"


export default function (app: any, path: any) {
    app.get(path, async (req: any, res: any, next: any) => {
        passport.authenticate("google", { successRedirect: "http://localhost:5001/", failureRedirect: "/internal_api/v1/loginError", session: true })(req, res, next)
    })
}
