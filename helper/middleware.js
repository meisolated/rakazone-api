export default function (req, res, next) {
    if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
        next()
        return
    }
    getRawBody(req, {
        length: req.headers['content-length'],
        limit: '1kb',
        encoding: contentType.parse(req).parameters.charset
    }, function (err, string) {
        if (err) return next(err)
        req.text = string
        next()
    })
}