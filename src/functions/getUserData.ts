import { convertToInternationalCurrencySystem } from "./functions"
import { loco_channel } from "../helpers/urlTemplate"
import { getInstagramData, getLocoData, getYoutubeChannelStatistics } from "./dataFetcher.js"

/**
 *
 * @returns JSON obj {yt_views_count, yt_subscribers_count, yt_videos_count}
 */
export const GetYoutubeUserData = (channelId: string, api_key: string) =>
    new Promise(async (resolve, _reject) => {
        let channel_statistics: any = await getYoutubeChannelStatistics(channelId, api_key)
        return resolve([
            { yt_views_count: convertToInternationalCurrencySystem(channel_statistics.viewCount) },
            { yt_subscribers_count: convertToInternationalCurrencySystem(channel_statistics.subscriberCount) },
            { yt_videos_count: channel_statistics.videoCount },
        ])
    })

/**
 *
 * @returns loco_views_count, loco_followers_count
 */
export const GetLocoUserData = (loco_username: string) =>
    new Promise(async (resolve) => {
        let loco_channel_url = loco_channel(loco_username)
        let locoData = await getLocoData(loco_channel_url)
        return resolve(locoData)
    })

/**
 *
 * @param {*} info
 * @returns nothing not working rightnow
 * @todo
 */
export const GetTwitterUserData = () =>
    new Promise((resolve) => {
        return resolve("skip")
    })

/**
 *
 * @param {*} info
 * @returns nothing not working rightnow
 * @todo
 */
