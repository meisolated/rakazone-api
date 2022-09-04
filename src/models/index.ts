import Mongoose from "./mongoose"
import sessionModel from "./session.model"
import usersModel from "./users.model"
import videosModel from "./videos.model"

const connection = new Mongoose().connection()

export const Video = connection.model("Video", videosModel)
export const User = connection.model("User", usersModel)
export const Session = connection.model("Session", sessionModel)