import cp from "child_process"
import EventEmitter from "events"
import fs, { createWriteStream } from "fs"
import { Op } from "sequelize"
import ytdl from "ytdl-core"
import { Videos } from "../models/Videos.model.js"

const downloadEmitter = new EventEmitter()
const youtube_base_url = "https://www.youtube.com/watch?v="
const videosList = await Videos.findAll({ where: { duration: { [Op.gt]: 60, [Op.lt]: 1200 } }, raw: true })

// const videosList = [
//     "zY_LzVdDWMA",
//     "rEssiE5CJM0",
//     "GcimpIAO36M",
//     "KTGLaS5-Whg",
//     "Z6nltfokuRM",
//     "RIK3KhOUILA",
//     "A7B4-7XJgss",
//     "r46xONYRI6I",
//     "0w52MHi223Q",
//     "SLT1mWCr08s",
//     "Jn8staToepo",
//     "Ax1GhQL-TPI",
//     "9WvIxpELghA",
//     "bRtBOXKTQsU",
//     "WPNXhXDDxFM",
//     "iAaQeZM93bE",
//     "n-qBtgsroMQ",
//     "pvwWz3ehiVw",
//     "RVUd92a6Yio",
//     "QEONbgZMJRA",
//     "FKiV31CCZ1c",
//     "0dTSpgmDlDE",
//     "g8BXg4fBkMk",
//     "GsK6rdHFeV8",
//     "9kOaN5KRg7Y",
//     "5prumknV3pM",
//     "EpXq0GlkxXo",
//     "X3PN3vYlAvU",
//     "KoumLLCPKYk",
//     "H4EbA_qtzb4",
//     "QroygeZ-20c",
//     "fR8zAb3vhtA",
//     "ofJrniOYRjM",
//     "YBpE9SvTcvY",
//     "9bd73JJpJ7I",
//     "_Pjk1jko96o",
//     "K3SjsgrxwQI",
//     "7IPZBjC2Efg",
//     "y_bHw4QAY30",
//     "6_HR0uxvEn8",
//     "M12X89b5YUY",
//     "kvK3hlq1l8o",
//     "UFtWm-dzCE0",
//     "BVJ4Jb61fUo",
//     "1tYxD3nHupM",
//     "3Zw_h4u0ngY",
//     "T2neFlmgerE",
//     "9i6_LoWosWA",
//     "OB3QWLPbeMc",
//     "YjsM6R7wUew",
//     "5BaERXuhbvY",
//     "N_g5FVK_CDc",
//     "km0okOXpLUU",
//     "4YBuYz-ZHgg",
//     "68yUYkdCT5E",
//     "pc0u_VdGtxU",
//     "ZBEMCNjQTLQ",
//     "ZrMKgJfyOpg",
//     "_lzVF72UlHo",
//     "1vftFlJ4-Qw",
//     "JiYPf1XNZ9Q",
//     "oTXz6ZtbQtM",
//     "fV2UEXdjYG4",
//     "fnkPuyJHNlE",
//     "_XXdu7uZdC4",
//     "e2I4vnAG0b0",
//     "WQmRGa2C4GE",
//     "ooY0W8sU1dk",
//     "wyTz1_VHJ8E",
//     "JOhIwrxGyjo",
//     "U94OSqX83y4",
//     "K_aJwVAdKmc",
//     "h_9rLR1C054",
//     "Jg1bm2leOl4",
//     "uLvG7hkhE68",
//     "EIsdkBk7bbY",
//     "MdW4Bhl_SoI",
//     "HlpgSobC184",
//     "o6RQO0Tpg4o",
//     "-L3jQCdAKwU",
//     "eyHikOQpt54",
//     "AnlVCSsX6gE",
//     "Cls7meFAdS0",
//     "T-eHg394rK4",
//     "abGVgjNqt2k",
//     "tUSAto4DwUw",
//     "c_kGGjt03OM",
//     "p-XDWLaGbi8",
//     "FhVtidiVT3A",
//     "p76PIOfo17U",
//     "8PFDJaAMOpc",
//     "ABkctmkhmgo",
//     "4mWTixIhR0Q",
//     "AF7GBXg0P4M",
//     "l5chXlV0kD0",
//     "1TBfQri17B4",
//     "BX6VKTfxlSA",
//     "zxwWBThwQz0",
//     "GnHZ_qz1gPo",
//     "RAFsaN7p9XE",
//     "gs9bqwAlZBA",
//     "cHyuEdtOGeg",
//     "aGB8QLiAwlY",
//     "mASVEgYoxmk",
//     "kQMRCOJXSZ0",
//     "GltD9CXkNXM",
//     "SJadvUHUVBw",
//     "yhcDEq69lCs",
//     "_GoUw7YxNw4",
//     "3-nLxTMTjrQ",
//     "WTydAQXVtB4",
//     "AqapvtrgiRk",
//     "USK1XeHOW98",
//     "DY5hhwWUVtw",
//     "YZUlpXRWaAg",
//     "ipJmfcxrL0Q",
//     "-F_bGUZa8Kc",
//     "B2BHFg4ytdU",
//     "8vlTSi9RmLk",
//     "nqyPoAro4HQ",
//     "Y6OqKqpb_9Y",
//     "63Qx7yhq_m4",
//     "GFjO14yF1d4",
//     "oB4a_aaqkvY",
//     "QuK48xmUsnQ",
//     "ZGgUUugyXsk",
//     "ZOJSaU_QZzQ",
//     "_NQugvbug_A",
//     "5qS72BKhCjE",
//     "k7U_UvbvqTc",
//     "DVoWrN4G1LQ",
//     "zhm_aDaBDx0",
//     "68EpyqXTE9U",
//     "k3MVqZbl8H0",
//     "7OqspO45Aso",
//     "lDbaKrZA80A",
//     "1MKFhhpdCiE",
//     "yIQq94b6YRk",
//     "VN83KG9KvVg",
//     "3wn9pqQdk6o",
//     "oUWjlLY6gMU",
//     "Ye6pSv2A7-E",
//     "Psx23qC7WmM",
//     "FPZkFjF_aiw",
//     "auFRnD5QnPY",
//     "NY6djHpoOI0",
//     "edxCYsLuzvs",
//     "1JLQTLYU6_s",
//     "NhZ5PBDALFw",
//     "WGcgbmIzixY",
//     "tfOLHtzXS4c",
//     "EFls1uBzIP4",
//     "yn6PKmifIxc",
//     "aV9CCfSmgRI",
//     "Td4uXOHzXoU",
//     "j_SpAmV_VCI",
//     "08LEL0YQroo",
//     "PRpjO7Vh0sM",
//     "91tYYJjDYEM",
//     "YaQEY_lRaQ8",
//     "FYatfhgaNXU",
//     "TNT2JLqEfT0",
//     "DVfecPu1vyo",
//     "eS4iGVNkwJ0",
//     "vDDryKFOmZY",
//     "JaACbmX5BgM",
//     "56KQlHy8BhM",
//     "jPW-WxctaqA",
//     "g5t2KWQQ0Bo",
//     "1VzdzeW3wyk",
//     "xKGSM0M-hEk",
//     "MQdSYQGkRuI",
//     "MR0coMzqq5U",
//     "xqann191kbY",
//     "2N8ETofz3Cg",
//     "aokcjZSMAEE",
//     "DqmrBUjCaik",
//     "TyBP7QNh4WA",
//     "3dYll16qzm8",
//     "Pil8XuW6X74",
//     "5DZz6m7eDbs",
// ]
// cp.exec("ffmpeg -i video.mp4 -i video.mp3 -c copy output.mp4")

const currentTime = () => {
 let date_ob = new Date()
 let date = ("0" + date_ob.getDate()).slice(-2)
 let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
 let year = date_ob.getFullYear()
 let hours = date_ob.getHours()
 let minutes = date_ob.getMinutes()
 let seconds = date_ob.getSeconds()
 return date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
}
function clog(msg, n) {
 let _currentTime = currentTime()
 if (n) return console.log("\n" + _currentTime + " - " + msg)
 return console.log(_currentTime + " - " + msg)
}

function printProgress(msg) {
 let _currentTime = currentTime()
 process.stdout.clearLine()
 process.stdout.cursorTo(0)
 process.stdout.write(_currentTime + " - " + msg)
}

const download = (videoId, _type, dir) =>
 new Promise((resolve, reject) => {
  let type = ["highestaudio", "highestvideo"]
  let fileType = [".mp3", ".mp4"]
  let download_speed = 0
  let start_time = Date.now()

  ytdl(youtube_base_url + videoId, { quality: type[_type] })
   .on("progress", (chunkLength, downloaded, total) => {
    const progress = (downloaded / total) * 100
    // download speed
    download_speed = Math.round(chunkLength / 1024)
    printProgress(`Downloading ${progress.toFixed(2)}% and ${download_speed} mb/s`)
   })
   .pipe(
    createWriteStream(`${dir}src${fileType[_type]}`).on("finish", () => {
     const end_time = Date.now()
     clog("Downloaded " + videoId + fileType[_type] + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
     resolve({ status: true })
    })
   )
   .on("ready", () => {
    clog("Downloading " + videoId + fileType[_type])
   })
 })

const merge = (videoId, dir) =>
 new Promise((resolve, reject) => {
  let fileType = [".mp3", ".mp4"]
  let start_time = Date.now()
  cp.exec(`ffmpeg -i ${dir}src${fileType[0]} -i ${dir}src${fileType[1]} -c copy ${dir}output.mp4`, (err, stdout, stderr) => {
   if (err) {
    clog(err)
    reject(err)
   }
   const end_time = Date.now()
   clog("Merged " + videoId + fileType[0] + " and " + videoId + fileType[1] + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
   resolve({ status: true })
  })
 })

const generatePreviewImages = (videoId, dir) =>
 new Promise((resolve, reject) => {
  let fileType = [".mp3", ".mp4"]
  let start_time = Date.now()
  cp.exec(`ffmpeg -i ${dir}output.mp4 -vf fps=1/10,scale=120:-1 ${dir}image_preview_%d.jpg`, (err, stdout, stderr) => {
   if (err) {
    clog(err)
    reject(err)
   }
   const end_time = Date.now()

   clog("Generated preview image for " + videoId + fileType[0] + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
   resolve({ status: true })
  })
 })

const convertToHLS = (videoId, dir) =>
 new Promise((resolve, reject) => {
  let start_time = Date.now()
  // cp.exec(`ffmpeg -i ${dir}/output.mp4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${dir}/HLS/index.m3u8`, (err, stdout, stderr) => {

  cp.exec(`ffmpeg -i ${dir}/output.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${dir}/HLS/index.m3u8`, (err, stdout, stderr) => {
   if (err) {
    clog(err)
   }
   const end_time = Date.now()
   resolve({ status: true })
   clog("Converting HLS " + videoId + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
  })
 })

const deleteAudioAndVideo = (dir) =>
 new Promise(async (resolve, reject) => {
  if (fs.existsSync(dir + "src.mp4") && fs.existsSync(dir + "src.mp4")) {
   fs.unlinkSync(dir + "src.mp4")
   fs.unlinkSync(dir + "src.mp3")
   //fs.unlinkSync(dir + "output.mp4")
   clog("Deleted audio and video files for")
   resolve({ status: true })
  }
  resolve({ status: true })
 })

const processVideo = (videoId) =>
 new Promise(async (resolve, reject) => {
  try {
   const dir = `./src/downloads/output/${videoId}/`
   if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    fs.mkdirSync(dir + "HLS/", { recursive: true })
    let audioDownload = await download(videoId, 0, dir) //this will download audio
    let videoDownload = await download(videoId, 1, dir) //this will download video

    // merge both audio and video
    let mergeAudioAndVideo = await merge(videoId, dir)
    //hls video
    // let HLS = await convertToHLS(videoId, dir)
    // generate preview image
    let previewImages = await generatePreviewImages(videoId, dir)
    let deleteUsedFiles = await deleteAudioAndVideo(dir)

    let interval = setInterval(() => {
     if (audioDownload.status && videoDownload.status && mergeAudioAndVideo.status && previewImages.status && deleteUsedFiles.status) {
      clearInterval(interval)
      resolve()
     }
    }, 500)
   } else {
    clog("Already in downloads folder " + videoId)
    resolve()
   }
  } catch (error) {
   clog(error)
  }
 })

export default function DownloadVideos(settings) {
 const { downloadUnder, deleteRawAudio, deleteRawVideo, deleteMergedVideo, progress, totalTasks, message } = settings

 let index = 0
 let currentIndex = -100
 const interval = setInterval(() => {
  if (index < videosList.length) {
   if (!videosList[index]) {
    clog("List ended")
    clearInterval(interval)
    return
   } else {
    if (currentIndex == index) return
    currentIndex = index
    processVideo(videosList[currentIndex].videoId)
     .then(() => {
      clog("Downloaded " + index + " videos out of " + videosList.length)
      return index++
     })
     .catch((err) => {
      clog("ERROR WHILE TRYING TO DOWNLOAD ")
      clog(videosList[currentIndex])
      clog(err)
      index++
     })
   }
  } else {
   clog("List ended")
   clearInterval(interval)
   return
  }
 }, 100)
}
