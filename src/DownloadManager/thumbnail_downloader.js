import https from "https"
import { Transform } from "stream"
import fs from "fs"

import { Videos } from "../models/Videos.model.js"

const videosList = await Videos.findAll({ raw: true })

videosList.map(async (video, index) => {
 // http://i.ytimg.com/vi/xqann191kbY/maxresdefault.jpg
 // https://img.youtube.com/vi/xqann191kbY/mqdefault.jpg
 // https://img.youtube.com/vi/xqann191kbY/sddefault.jpg
 // https://img.youtube.com/vi/xqann191kbY/hqdefault.jpg
 // https://img.youtube.com/vi/xqann191kbY/default.jpg
 // https://img.youtube.com/vi/xqann191kbY/0.jpg
 // https://img.youtube.com/vi/xqann191kbY/1.jpg
 // https://img.youtube.com/vi/xqann191kbY/2.jpg
 // https://img.youtube.com/vi/xqann191kbY/3.jpg
 // https://img.youtube.com/vi/xqann191kbY/4.jpg'
 let baseUrl = "https://img.youtube.com/vi/"
 let thumbnails = ["maxresdefault", "mqdefault", "sddefault", "hqdefault", "default", "0", "1", "2", "3", "4"]

 thumbnails.map(async (thumbnail, index) => {
  const request = https.request(baseUrl + video.videoId + "/" + thumbnail + ".jpg", function (response) {
   var data = new Transform()

   response.on("data", function (chunk) {
    data.push(chunk)
   })
   response.on("end", function () {
    fs.writeFileSync(`./src/downloads/videoThumbnails/${video.videoId + "-" + thumbnail}.png`, data.read())
    console.log(video.videoId + " " + thumbnail + " downloaded")
   })
  })

  request.end()
  request.on("error", (e) => {
   console.log(e)
  })
 })
})
