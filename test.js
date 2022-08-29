import { GetSortedVideos } from "./src/handler/GetSortedVideos.js"


console.time()
const data = await GetSortedVideos()
console.log(data)
console.timeEnd()