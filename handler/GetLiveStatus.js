import { loco_channel } from "../functions/urlTemplates.js"
import { getLocoLiveData, getYoutubeLiveData } from "./dataFetcher.js"





/**
 * 
 * @param {*} {yt_api_key, channelId} 
 * @returns 
 */
export const CheckYoutube = (yt_api_key, channelId) =>
    new Promise(async (resolve, _reject) => {
        let liveData = await getYoutubeLiveData(channelId, yt_api_key)
        return resolve(liveData)

    })

/**
 * 
 * @param {*} {loco_username} 
 * @returns 
 */
export const CheckLoco = (loco_username) =>
    new Promise(async (resolve, reject) => {
        let loco_channel_url = loco_channel(loco_username)
        let liveData = await getLocoLiveData(loco_channel_url)
        return resolve(liveData)
    })


export const CheckBoth = () => new Promise((reslove, reject) => {

})