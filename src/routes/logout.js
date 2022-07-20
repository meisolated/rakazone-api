export default function (app, path) {
    app.get(path, async (req, res) => {
        req.logout()
        return res.redirect('http://localhost:3000/')
    })
}