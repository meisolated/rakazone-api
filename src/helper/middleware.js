export default function (req, res, next) {
 const forwarded = req.headers["x-forwarded-for"]
 const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

 if (!req.hostname) {
  return res.sendStatus(404)
 }
 res.setHeader("Access-Control-Allow-Origin", "*")
 res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

 next()
 // if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
 //     next()
 //     return
 // }
 // getRawBody(req, {
 //     length: req.headers['content-length'],
 //     limit: '1kb',
 //     encoding: contentType.parse(req).parameters.charset
 // }, function (err, string) {
 //     if (err) return next(err)
 //     req.text = string
 //     next()
 // })
}
