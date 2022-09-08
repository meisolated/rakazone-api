// +------------+--------------+------+-----+---------+----------------+
// | Field      | Type         | Null | Key | Default | Extra          |
// +------------+--------------+------+-----+---------+----------------+
// | id         | int          | NO   | PRI | NULL    | auto_increment |
// | from_where | varchar(50)  | NO   | UNI | NULL    |                |
// | to_where   | varchar(256) | NO   |     | NULL    |                |
// +------------+--------------+------+-----+---------+----------------+

import { Schema } from "mongoose"

interface redirects {
    fromWhere: string,
    toWhere: string
}


export default new Schema<redirects>({
    fromWhere: { type: String, required: true },
    toWhere: { type: String, required: true }
})