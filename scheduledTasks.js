import schedule from "node-schedule"
import { updateUserData, updateLiveData, updateVideoStats } from "./dataHandler/updater.js"
import { addNewVideos } from "./dataHandler/addNewData.js"
import { Live } from "./models/Live.model.js"
import { Cache } from "./cache/index.js"




//run every minute
schedule.scheduleJob("0 */1 * * * *", async function () {
    await updateLiveData()
    let liveData = await Live.findOne({ where: { id: 1 } })
    Cache.set("liveData", liveData)

})

//run every 24 hours
schedule.scheduleJob("0 0 */23 * * *", async function () { //0 0 */23 * * *
    await updateUserData()
    await addNewVideos()
    await updateVideoStats()
})

