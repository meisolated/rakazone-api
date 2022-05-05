import { GetApiKeys, GetUserData } from "../database/db_functions.js"
import { loco_channel } from "../functions/urlTemplates.js"
import { getLocoLiveData, getYoutubeLiveData } from "./dataFetcher.js"





/**
 *
 * @returns JSON Data if Youtubers is live or not
 * {title, platform, link, thumbnail, viewers_count, status, last_update,}
 */
export const CheckYoutube = () =>
    new Promise(async (resolve, _reject) => {
        let yt_api_key = await GetApiKeys().then((keys) => keys[0].api_key)
        let channelId = await GetUserData().then((data) => data[0].yt_channel_id)
        let liveData = await getYoutubeLiveData(channelId, yt_api_key)
        return resolve(liveData)

    })

/**
 *
 * @returns JSON Data if Youtubers is live or not
 * {title, platform, link, thumbnail, viewers_count, status, last_update,}
 *
 */
export const CheckLoco = () =>
    new Promise(async (resolve, reject) => {

        let loco_username = await GetUserData().then((data) => data[0].loco_username)
        let loco_channel_url = loco_channel(loco_username)
        let liveData = await getLocoLiveData(loco_channel_url)
        return resolve(liveData)
    })
