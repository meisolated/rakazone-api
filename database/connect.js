import mysql from 'mysql2'
import 'dotenv/config'

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    database: process.env.DATABASE,
    password: process.env.PASS,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
})

export default pool