// import { Cache } from "./scheduledTasks.js"

// let x = Cache
import { GetSortedVideos } from "./handler/GetSortedVideos.js"

let x = await GetSortedVideos()
console.log(x)


// import { GetSortedVideos } from "./handler/GetSortedVideos.js"