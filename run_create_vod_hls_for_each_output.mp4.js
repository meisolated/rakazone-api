import fs from "fs"
import cp from "child_process"
// list folders
const folders = fs.readdirSync("./downloads/output/")

folders.map((folder, index) => {
    const start = Date.now()
    console.log(`Generating HLS for ${folder}`)
 try {
    cp.execSync(`bash ./create-vod-hls.sh ./downloads/output/${folder}/output.mp4 ./downloads/output/${folder}/HLS`, (error, stdout, stderr) => {
        if (error !== null) {
         console.log(`exec error: ${error}`)
        }
       })
 } catch (error) {
    console.log("Error creating HLS " + folder)
 }
const end = Date.now()
console.log(`Generating HLS for ${folder} took ${end - start}ms -- ${index + 1}/${folders.length}`)
})
