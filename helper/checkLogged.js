export default function (req, res, next) {
    if (req.isAuthenticated() || req.user) {
        next()
    } else {
        res.redirect("http://localhost:3000/")
    }
}
