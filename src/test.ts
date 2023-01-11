import { getYoutubeLiveData, getLocoLiveData } from "./functions/dataFetcher"

const main = async () => {
    const a = await getLocoLiveData("https://loco.gg/streamers/beast-gaming?type=live")
    const b = await getYoutubeLiveData("UCRj_BU95SebaRi2FziXEoTg", "AIzaSyCSGU0pi0oRrS_uI8JURwBQHTMcDJj9ZZs")
    console.log(a)
    console.log(b)
}
main()
console.log("Hello World")
