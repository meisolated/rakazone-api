//TODO: Will make this work later
//TODO: https://github.com/mongodb-js/connect-mongodb-session/blob/master/index.js
// import session from "express-session"
// import config from "../config"
// import { Session } from "../models"


// interface ses {
//     path?: string,
//     _expires: any,
//     originalMaxAge?: any,
//     httpOnly: boolean
// }
// /**
//  * @deprecated
//  */
// export default class MongoStore extends session.Store {
//     get(sid: string, callback: (err: any, session?: session.SessionData | null | undefined) => void): void {
//         Session.findOne({ sessionId: sid }).then(_session => {
//             if (typeof _session.data == null) return callback && callback(`Session not found`)
//             console.log("session")
//             console.log(_session)
//             const sessxxxx = {
//                 cookie: _session.data
//             }
//             return callback && callback(null, sessxxxx)
//         }).catch(e => callback && callback(`Error Getting ${sid}: ${e.message}`))
//     }
//     set(sid: string, session: session.SessionData, callback?: ((err?: any) => void) | undefined): void {
//         console.log(sid)
//         console.log(session.cookie)
//         const expires = new Date(new Date().getTime() + config.sessionExpire)
//         const sess: ses = {
//             path: session.cookie.path,
//             _expires: expires,
//             originalMaxAge: null,
//             httpOnly: true
//         }
//         const newSession = new Session()
//         newSession._id = sid
//         newSession.expires = expires
//         newSession.data = sess
//         newSession.save().then(() => {
//             return callback && callback()
//         }).catch(e => callback && callback(`Error Setting ${sid}: ${e.message}`))
//     }
//     destroy(sid: string, callback?: ((err?: any) => void) | undefined) {
//         Session.deleteOne({ _id: sid }).then(() => {
//             return callback && callback()
//         }).catch(e => {
//             new Error(`Error destroying ${sid} :${e.message}`)
//             return callback && callback(e.message)
//         })
//     }
//     all?(callback: any): void {
//         throw new Error("Method not implemented.")
//     }

//     /** Returns the amount of sessions in the store. */
//     length?(callback: any): void {
//         throw new Error("Method not implemented.")
//     }

//     /** Delete all sessions from the store. */
//     clear?(callback: any): void {
//         throw new Error("Method not implemented.")
//     }

//     /** "Touches" a given session, resetting the idle timer. */
//     touch?(sid: string, session: session.SessionData, callback: any): void {
//         throw new Error("Method not implemented.")
//     }
// }