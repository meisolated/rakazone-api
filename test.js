// import { AddNewVideos } from "./functions/updateVideosList.js"
let apikey = "AIzaSyCCqAUg5VvCVHsyWyr02wWvMHvYPe7TsjM"
let channelid = "UCfXoodvwgOHSwLMoyExQVqg"
// let x = await AddNewVideos(apikey, channelid)


import { getYoutubeVidoesList } from "./handler/dataFetcher.js"

let list = await getYoutubeVidoesList(channelid, apikey)
list.items.forEach(videos => {
    // console.log(videos.id)
    console.log(videos.snippet.liveBroadcastContent)
})
