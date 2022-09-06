import fs from "fs"

class fsProvider {
  exists(req: any, cb: any) {
    fs.access(req.filePath, (exists) => cb(null, exists))
  }
  getSegmentStream(req: any, cb: any) {
    cb(null, fs.createReadStream(req.filePath))
  }
  getManifestStream(req: any, cb: any) {
    // @ts-ignore
    cb(null, fs.createReadStream(req.filePath, { bufferSize: 64 * 1024 }))
  }
}

// interface provider {
//   exists: Function,
//   getSegmentStream: Function,
//   getManifestStream: Function,
// }

// var fsProvider: any = {}



// fsProvider.exists = function (req: any, cb: any) {
//   fs.access(req.filePath, function (exists) {
//     cb(null, exists)
//   })
// }

// fsProvider.getSegmentStream = function (req: any, cb: any) {
//   cb(null, fs.createReadStream(req.filePath))
// }

// fsProvider.getManifestStream = function (req: any, cb: any) {
//   // @ts-ignore
//   cb(null, fs.createReadStream(req.filePath, { bufferSize: 64 * 1024 }))
// }

export default fsProvider
