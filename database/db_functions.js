import { throwError } from "../functions/funtions.js"
import { Get, Update, Del, Insert } from "./poolify.js"

//?INSET
export const AddVideo = (videoData) =>
    new Promise((resolve, reject) => {
        Insert(
            "tbl_videos",
            `(videoId, title, publishedAt, duration, type ,viewCount, likeCount, commentCount) VALUES
             ("${videoData.videoId}", "${videoData.title}", "${videoData.publishedAt}", "${videoData.duration}", "${videoData.type}", "${videoData.viewCount}", "${videoData.likeCount}", "${videoData.commentCount}")`
        )
            .then(() => resolve("done"))
            .catch((err) => reject(throwError(err)))
    })
//? UPDATE
export const UpdateApiUtilization = (api_key, addWhat) =>
    new Promise((resolve, reject) => {
        Update("tbl_youtube_api", `utilization = utilization + ${addWhat} WHERE api_key = '${api_key}'`)
            .then(() => resolve("done"))
            .catch((err) => reject(throwError(err)))
    })

export const UpdateLiveData = (props) =>
    new Promise((resolve, reject) => {
        Update(
            "tbl_live",
            `title = '${props.title}', platform = '${props.platform}', link = '${props.link}', thumbnail = '${props.thumbnail}', viewers_count = '${props.viewers_count}', status = '${props.status}', last_update = '${props.last_update}' WHERE id = 1`
        )
            .then(() => resolve("done"))
            .catch((err) => reject(throwError(err)))
    })

export const UpdateUserData = (props) =>
    new Promise((resolve, reject) => {
        Update(
            "tbl_user_data",
            `user_name = '${props.user_name}', 
             user_dob = '${props.user_dob}',
             yt_channel_id = '${props.yt_channel_id}',
             yt_channel_name = '${props.yt_channel_name}',
             yt_subscribers_count = '${props.yt_subscribers_count}', 
             yt_views_count = '${props.yt_views_count}',
             yt_videos_count = '${props.yt_videos_count}',
             insta_followers_count = '${props.insta_followers_count}',
             twitter_followers_count = '${props.twitter_followers_count}',
             loco_followers_count = '${props.loco_followers_count}',
             loco_views_count = '${props.loco_views_count}',
             insta_username = '${props.insta_username}',
             fb_username = '${props.fb_username}',
             loco_username = '${props.loco_username}',
             twitter_username = '${props.twitter_username}',
             last_update = '${props.last_update}'
             WHERE id = 1`
        )
            .then(() => resolve("done"))
            .catch((err) => reject(throwError(err)))
    })

//? GET
export const GetApiKeys = () =>
    new Promise((resolve, reject) => {
        Get("tbl_youtube_api", "utilization BETWEEN 0 AND 8999")
            .then((data) => resolve(data))
            .catch((err) => reject(throwError(err)))
    })

export const GetRedirectList = () =>
    new Promise((resolve, reject) => {
        Get("tbl_redirects", "")
            .then((data) => resolve(data))
            .catch((err) => reject(throwError(err)))
    })

export const GetUserData = () =>
    new Promise((resolve, reject) => {
        Get("tbl_user_data", "")
            .then((data) => resolve(data))
            .catch((err) => reject(throwError(err)))
    })

export const GetLiveData = () =>
    new Promise((resolve, reject) => {
        Get("tbl_live", "id = 1")
            .then((data) => resolve(data))
            .catch((err) => reject(throwError(err)))
    })

export const GetSettings = () =>
    new Promise((resolve, reject) => {
        Get("tbl_settings", "id = 1")
            .then((data) => resolve(data))
            .catch((err) => reject(throwError(err)))
    })
/**
 *
 * @returns List of Videos from database
 */
export const GetVideos = () =>
    new Promise((resolve, reject) => {
        Get("tbl_videos", "")
            .then((data) => resolve(data))
            .catch((err) => reject(throwError(err)))
    })

//? DELETE
