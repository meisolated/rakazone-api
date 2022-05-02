import { GetApiKeys, GetLiveData, GetSettings, GetUserData, UpdateLiveData, UpdateUserData } from "./database/db_functions.js"
import { getYoutubeCurrentViewers } from "./handler/dataFetcher.js"
import { CheckYoutube, CheckLoco } from "./handler/GetLiveStatus.js"
import { GetLocoUserData, GetYoutubeUserData } from "./handler/GetUserData.js"
import LoggerUtil from "./util/logger.js"


async function updateLiveViewersCount(liveData, apikey) {
    // LoggerUtil.info("Updating live viewers count")

    let currentTime = Date.now()
    let UpdateCurrentViewers = (liveData.platform === "youtube") ? await getYoutubeCurrentViewers(liveData.link.split("=")[1], apikey).then((data) => data.items[0].liveStreamingDetails.concurrentViewers != undefined ? { viewers_count: data.items[0].liveStreamingDetails.concurrentViewers, status: "live" } : { viewers_count: 0, status: "offline" }) : await CheckLoco()
    UpdateCurrentViewers.last_update = currentTime
    let UpdateLive = Object.assign(liveData, UpdateCurrentViewers)
    return await UpdateLiveData(UpdateLive).then(() => {
        // LoggerUtil.info("Updated live data")
        return
    })
}

export default async function main() {
    new Promise(async (resolve, reject) => {
        //Update user data
        let userData = await GetUserData().then((data) => data[0])

        //Update live stream data
        let liveData = await GetLiveData().then((data) => data[0])

        let apikey = await GetApiKeys().then((data) => data[0].api_key)

        let settings = await GetSettings().then((data) => data[0])

        let currentTime = Date.now()

        if (liveData.last_update + settings.check_in_if_live < currentTime) updateLiveViewersCount(liveData, apikey)

        // Update or not
        // LoggerUtil.info("Checking if live data needs to be updated")
        if (liveData.last_update + settings.check_in < currentTime) {
            // LoggerUtil.info("Live data needs to be updated")
            if (liveData.status !== "live") {
                let checkingYoutube = await CheckYoutube()
                let checkingLoco = await CheckLoco()
                let whereLiveData = checkingLoco.status === "live" ? checkingLoco : checkingYoutube
                await UpdateLiveData(whereLiveData)
            } else if (liveData.status === "live") {
                //Update live data
                let UpdateCurrentViewers =
                    liveData.platform === "youtube"
                        ? await getYoutubeCurrentViewers(liveData.link.split("=")[1], apikey).then((data) =>
                            data.items[0].liveStreamingDetails != undefined ? { viewers_count: data.items[0].liveStreamingDetails.concurrentViewers, status: "live" } : { viewers_count: 0, status: "offline" }
                        )
                        : await CheckLoco()

                UpdateCurrentViewers.last_update = currentTime
                let UpdateLive = Object.assign(liveData, UpdateCurrentViewers)
                await UpdateLiveData(UpdateLive).then(() => {
                    // LoggerUtil.info("Updated live data")
                })
            }
        } else {
            // LoggerUtil.info("Not updating live data")

        }

        // LoggerUtil.info("Checking if user data needs to be updated")
        if (userData.last_update + settings.update_user_data_duration < currentTime) {
            // LoggerUtil.info("User data needs to be updated")
            let getYoutubeUserData = await GetYoutubeUserData()
            let getLocoUserData = await GetLocoUserData()

            let finalUserData = Object.assign(getLocoUserData, getYoutubeUserData)
            finalUserData = Object.assign(userData, finalUserData)
            await UpdateUserData(finalUserData).then(() => {
                // LoggerUtil.info("Updated user data")
            })
        } else {
            // LoggerUtil.info("Not updating user data")
        }


        //Update tbl_content every week maybe or something  

        resolve()
    })
}
