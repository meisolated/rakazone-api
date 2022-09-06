import passport from "passport"
import "../../../lib/passport"

export default function (app: any, path: any) {
    app.get(path, async (req: any, res: any, next: any) => {
        try {
            passport.authenticate("google", { scope: ["profile", "email"], session: true })(req, res, next)
        } catch (err) {
            res.send({ error: "Error" })
        }
    })
}
