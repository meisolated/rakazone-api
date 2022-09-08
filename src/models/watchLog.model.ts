// +-----------+--------------+------+-----+---------+----------------+
// | Field     | Type         | Null | Key | Default | Extra          |
// +-----------+--------------+------+-----+---------+----------------+
// | id        | int          | NO   | PRI | NULL    | auto_increment |
// | user_id   | varchar(100) | NO   |     | NULL    |                |
// | playing   | tinyint(1)   | NO   |     | NULL    |                |
// | muted     | tinyint(1)   | NO   |     | NULL    |                |
// | volume    | int          | NO   |     | NULL    |                |
// | ts        | varchar(20)  | NO   |     | NULL    |                |
// | ct        | varchar(20)  | NO   |     | NULL    |                |
// | vl        | varchar(20)  | NO   |     | NULL    |                |
// | vi        | varchar(200) | NO   |     | NULL    |                |
// | platform  | varchar(20)  | NO   |     | NULL    |                |
// | browser   | varchar(400) | NO   |     | NULL    |                |
// | timestamp | varchar(50)  | YES  |     | NULL    |                |
// +-----------+--------------+------+-----+---------+----------------+

import { Schema } from "mongoose"

interface watchLog {
    userId: string,
    playing: boolean,
    muted: boolean,
    volume: number,
    ts: number,
    ct: number,
    vl: number,
    vi: string,
    platform: string,
    browser: string,
    timestamp: number
}

export default new Schema<watchLog>({
    userId: { type: String, required: true },
    playing: { type: Boolean, required: true },
    muted: { type: Boolean, required: true },
    volume: { type: Number, required: true },
    ts: { type: Number, required: true },
    ct: { type: Number, required: true },
    vl: { type: Number, required: true },
    vi: { type: String, required: true },
    platform: { type: String, required: true },
    browser: { type: String, required: true },
    timestamp: { type: Number, required: true },
})
