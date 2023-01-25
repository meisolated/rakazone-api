import analyticsModel from "./analytics.model"
import contactFormModel from "./contact.model"
import emailsModel from "./emails.model"
import liveModel from "./live.model"
import Mongoose from "./mongoose"
import popupModel from "./popups.model"
import redirectsModel from "./redirects.model"
import serverSettingsModel from "./serverSettings.model"
import sessionModel from "./sessions.model"
import streamerDataModel from "./streamerData.model"
import usersModel from "./users.model"
import videosModel from "./videos.model"
import watchHistoryModel from "./watchHistory.model"
import watchLogModel from "./watchLog.model"
import youtubeAPIModel from "./youtubeAPI.model"

const connection = new Mongoose().connection()

export const Videos = connection.model("Videos", videosModel)
export const Users = connection.model("User", usersModel)
export const Sessions = connection.model("Sessions", sessionModel)
export const Live = connection.model("Live", liveModel)
export const Popups = connection.model("Popups", popupModel)
export const Redirects = connection.model("Redirects", redirectsModel)
export const ServerSettings = connection.model("ServerSettings", serverSettingsModel)
export const StreamerData = connection.model("StreamerData", streamerDataModel)
export const Analytics = connection.model("Analytics", analyticsModel)
export const WatchHistory = connection.model("WatchHistory", watchHistoryModel)
export const WatchLog = connection.model("WatchLog", watchLogModel)
export const YoutubeAPI = connection.model("YoutubeAPI", youtubeAPIModel)
export const EmailNewsletter = connection.model("emailNewsletter", emailsModel)
export const ContactForm = connection.model("contactForm", contactFormModel)
// connection.collection("videos").createIndex({ title: "text" })
