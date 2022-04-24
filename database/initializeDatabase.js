import pool from "./connect.js"

let tableName

//inserting apis
tableName = "tbl_youtube_api"
pool.query(`truncate ${tableName}`)
pool.query(`INSERT INTO ${tableName} (apikey, utilization) VALUES (?, ?)`, ["AIzaSyCCqAUg5VvCVHsyWyr02wWvMHvYPe7TsjM", 0])
pool.query(`INSERT INTO ${tableName} (apikey, utilization) VALUES (?, ?)`, ["AIzaSyCSGU0pi0oRrS_uI8JURwBQHTMcDJj9ZZs", 0])
pool.query(`INSERT INTO ${tableName} (apikey, utilization) VALUES (?, ?)`, ["AIzaSyCwVeeA3E7ia5XPd0U_P2mvIi1IQUL0nGE", 0])

//inset empty in live
tableName = "tbl_live"
pool.query(`truncate ${tableName}`)
pool.query(`INSERT INTO ${tableName} (platform, link, title, thumbnail, viewers_count, status, last_update) VALUES (?, ?, ?, ?, ?, ?, ?)`, ["youtube", "nothing", "nothing", 0, "notlive", 0, 0])

//insert in redirects
tableName = "tbl_redirects"
pool.query(`truncate ${tableName}`)
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["youtube", "https://www.youtube.com/channel/UCRj_BU95SebaRi2FziXEoTg"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["yt", "https://www.youtube.com/channel/UCRj_BU95SebaRi2FziXEoTg"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["insta", "https://www.instagram.com/rakazonegaming/"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["instagram", "https://www.instagram.com/rakazonegaming/"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["twitter", "https://twitter.com/rakazonegaming"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["twitch", "https://www.twitch.tv/rakazone"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["loco", "https://loco.gg/streamers/RakaZone_Gaming"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["discord", "https://discord.gg/RKQFdMAd63"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["facebook", "https://www.facebook.com/RakaZoneGaming"])
pool.query(`INSERT INTO ${tableName} (from_where, to_where) VALUES (?, ?)`, ["fb", "https://www.facebook.com/RakaZoneGaming"])

tableName = "tbl_user_data"
pool.query(`truncate ${tableName}`)
pool.query(
    `INSERT INTO ${tableName} (user_name, user_dob, yt_channel_id, yt_channel_name, yt_subscribers_count, yt_views_count, yt_videos_count, insta_followers_count, twitter_followers_count, loco_follwers_count, loco_views_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ["Rishab Karanwal", "", "UCRj_BU95SebaRi2FziXEoTg", "0", "0", "0", "0", "0", "0", "0", "0"]
)
