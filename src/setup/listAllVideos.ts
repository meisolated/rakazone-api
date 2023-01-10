import axios from "axios"
import { Videos, YoutubeAPI } from "../models"
import { youtube_channel_video_statistics } from "../helpers/apiTemplate"
import { sleep, throwError } from "../functions/functions"
import moment from "moment"

let first = 0
let videos_count = 0
async function get_videos(pageToken: string) {
    let youtubeApiKey = await YoutubeAPI.findOne({ utilization: { $lt: 9900 } })
}
