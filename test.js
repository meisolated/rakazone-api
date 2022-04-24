import { getSortedVideos } from "./handler/dataFetcher.js"


let data = await getSortedVideos()
console.log(data)