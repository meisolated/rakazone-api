import { createWriteStream } from "fs"
import cp from "child_process"
import ytdl from "ytdl-core"
import fs from "fs"

let youtube_base_url = "https://www.youtube.com/watch?v="
let videosList = ["lyb-COpIrYY"]
// cp.exec("ffmpeg -i video.mp4 -i video.mp3 -c copy output.mp4")

function printProgress(msg) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(msg)
}

const download = (videoId, _type, dir) =>
    new Promise((resolve, reject) => {
        let type = ["highestaudio", "highestvideo"]
        let fileType = [".mp3", ".mp4"]
        let download_speed = 0
        let start_time = new Date().getTime()
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        ytdl(youtube_base_url + videoId, { quality: type[_type] })
            .on("progress", (chunkLength, downloaded, total) => {
                const progress = (downloaded / total) * 100
                // download speed
                download_speed = Math.round(chunkLength / 1024)
                printProgress(`Downloading ${progress.toFixed(2)}% and ${download_speed} mb/s`)
            })
            .pipe(
                createWriteStream(`${dir}src${fileType[_type]}`).on("finish", () => {
                    const end_time = new Date().getTime()
                    console.log("\nDownloaded " + videoId + fileType[_type] + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds")
                    resolve({ status: "done" })
                })
            )
            .on("ready", () => {
                console.log("\nDownloading " + videoId + fileType[_type])
            })
    })

const merge = (videoId, dir) =>
    new Promise((resolve, reject) => {
        let fileType = [".mp3", ".mp4"]
        let start_time = new Date().getTime()
        cp.exec(`ffmpeg -i ${dir}src${fileType[0]} -i ${dir}src${fileType[1]} -c copy ${dir}output.mp4`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            const end_time = new Date().getTime()
            console.log("\nMerged " + videoId + fileType[0] + " and " + videoId + fileType[1] + " in " + (end_time - start_time / 1000) + " seconds")
            resolve({ status: "done" })
        })
    })

const genratePreviewImages = (videoId, dir) =>
    new Promise((resolve, reject) => {
        let fileType = [".mp3", ".mp4"]
        let start_time = new Date().getTime()
        cp.exec(`ffmpeg -i ${dir}output.mp4 -vf fps=1/10,scale=120:-1 ${dir}image_preview_%d.jpg`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            const end_time = new Date().getTime()
            console.log("\nGenerated preview image for " + videoId + fileType[0] + " in " + (end_time - start_time / 1000) + " seconds")
            resolve({ status: "done" })
        })
    })


// foreach video do
videosList.map(async (videoId) => {
    const dir = `./downloads/output/${videoId}/`
    await download(videoId, 0, dir) //this will download audio
    await download(videoId, 1, dir) //this will download video
    // merge both audio and video
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    await merge(videoId, dir)
    // generate preview image
    await genratePreviewImages(videoId, dir)

})
