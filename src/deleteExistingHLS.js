import fs from "fs"

// list folders 
const folders = fs.readdirSync("./downloads/output/")

folders.forEach(folder => {
    // check if folder exist
    if (fs.existsSync(`./downloads/output/${folder}/HLS`)) {
        // delete
        fs.rmdirSync(`./downloads/output/${folder}/HLS`, { recursive: true })
    }

});