import fs from "fs"

class fsProvider {
    exists(req: any, cb: any) {
        fs.access(req.filePath, (exists) => cb(null, exists))
    }
    getSegmentStream(req: any, cb: any) {
        cb(null, fs.createReadStream(req.filePath))
    }
    getManifestStream(req: any, cb: any) {
        cb(
            null,
            fs.createReadStream(req.filePath, { highWaterMark: 64 * 1024 })
        )
    }
}
export default fsProvider
