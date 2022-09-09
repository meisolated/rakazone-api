import { Request, Response } from "express"
import http from "http"
import path from "path"
import url from "url"
import zlib from "zlib"
import fsProvider from "./fsProvider"
import httpAttach from "./http-attach"

var CONTENT_TYPE = {
    MANIFEST: "application/vnd.apple.mpegurl",
    SEGMENT: "video/MP2T",
    HTML: "text/html",
}

class HLSServer {
    path: string = ""
    dir: string = ""
    provider: any = null
    constructor(server: any, opts: any) {
        this.path = opts.path || "/"
        this.dir = opts.dir || ""
        this.provider = opts.provider || new fsProvider()
        // this.provider = fsProvider //||opts.provider
        if (isNaN(server)) {
            httpAttach(server, this._middleware.bind(this))
        } else {
            let port = server
            server = http.createServer()
            httpAttach(server, this._middleware.bind(this))
            server.listen(port)
        }
    }

    _middleware(req: Request, res: Response, next: any) {
        let uri = url.parse(req.url).pathname || ""
        let relativePath = path.relative(this.path, uri)
        let filePath = path.join(this.dir, relativePath)
        let extension = path.extname(filePath)

        // @ts-ignore
        req.filePath = filePath

        let ae = req.headers["accept-encoding"] || ""
        //@ts-ignore
        req.acceptsCompression = ae.match(/\bgzip\b/)

        this.provider.exists(req, (err: any, exists: any) => {
            if (err) {
                res.statusCode = 500
                res.end()
            } else if (!exists) {
                res.statusCode = 404
                res.end()
            } else {
                switch (extension) {
                    case ".m3u8":
                        this._writeManifest(req, res, next)
                        break
                    case ".ts":
                        this._writeSegment(req, res, next)
                        break
                    default:
                        next()
                        break
                }
            }
        })
    }

    _writeManifest(req: Request, res: Response, next: any) {
        this.provider.getManifestStream(req, (err: any, stream: any) => {
            if (err) {
                res.statusCode = 500
                res.end()
                return next()
            }
            res.setHeader("Content-Type", CONTENT_TYPE.MANIFEST)
            res.statusCode = 200
            // @ts-ignore
            if (req.acceptsCompression) {
                res.setHeader("content-encoding", "gzip")
                res.statusCode = 200
                var gzip = zlib.createGzip()
                stream.pipe(gzip).pipe(res)
            } else {
                stream.pipe(res, "utf-8")
            }
        })
    }

    _writeSegment(req: any, res: any, next: any) {
        this.provider.getSegmentStream(req, function (err: any, stream: any) {
            if (err) {
                res.statusCode = 500
                res.end()
                return
            }
            res.setHeader("Content-Type", CONTENT_TYPE.SEGMENT)
            res.statusCode = 200
            stream.pipe(res)
        })
    }
}
export default HLSServer
