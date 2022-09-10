import { NextFunction, Request, Response } from "express"
import path from "path"
import url from "url"
import zlib from "zlib"
import fsProvider from "./fsProvider"


interface options {
    hlsDir: string
}
function HLSServer(req: Request, res: Response, next: NextFunction, options: options) {
    const CONTENT_TYPE = {
        MANIFEST: "application/vnd.apple.mpegurl",
        SEGMENT: "video/MP2T",
        HTML: "text/html",
    }
    let uri = url.parse(req.url).pathname || ""
    let relativePath = path.relative("/", uri)
    let filePath = path.join(options.hlsDir, relativePath)
    let extension = path.extname(filePath)
    const provider = new fsProvider()
    // @ts-ignore
    req.filePath = filePath

    let ae = req.headers["accept-encoding"] || ""
    //@ts-ignore
    req.acceptsCompression = ae.match(/\bgzip\b/)

    provider.exists(req, (err: any, exists: any) => {

        if (err) {
            res.statusCode = 500
            res.end()
        } else if (!exists) {
            res.statusCode = 404
            res.end()
        } else {
            switch (extension) {
                case ".m3u8":
                    _writeManifest(req, res, next)
                    break
                case ".ts":
                    _writeSegment(req, res, next)
                    break
                default:
                    next()
                    break
            }
        }
    })

    function _writeManifest(req: Request, res: Response, next: NextFunction) {


        provider.getManifestStream(req, (err: any, stream: any) => {
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
    function _writeSegment(req: Request, res: Response, _next: NextFunction) {
        provider.getSegmentStream(req, function (err: any, stream: any) {
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
