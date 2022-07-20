import session from "express-session"
import MySQLStore from "express-mysql-session"
import "dotenv/config"

let DATABASE = process.env.ENV === "production" ? process.env.DATABASE : process.env.DEVDATABASE
const db_config = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DBUSER,
    password: process.env.PASS,
    database: DATABASE,
}

const db_options = {
    // Host name for database connection:
    host: db_config.host,
    // Port number for database connection:
    port: db_config.port,
    // Database user:
    user: db_config.user,
    // Password for the above database user:
    password: db_config.password,
    // Database name:
    database: db_config.database,
    // Whether or not to automatically check for and clear expired sessions:
    clearExpired: true,
    // How frequently expired sessions will be cleared; milliseconds:
    checkExpirationInterval: 900000,
    // The maximum age of a valid session; milliseconds:
    expiration: 30 * 24 * 60 * 60 * 1000,
    // Whether or not to create the sessions database table, if one does not already exist:
    createDatabaseTable: true,
    // Number of connections when creating a connection pool:
    connectionLimit: 1,
    // Whether or not to end the database connection when the store is closed.
    // The default value of this option depends on whether or not a connection was passed to the constructor.
    // If a connection object is passed to the constructor, the default value for this option is false.
    endConnectionOnClose: true,
    charset: "utf8mb4_bin",
    schema: {
        tableName: "tbl_sessions",
        columnNames: {
            session_id: "session_id",
            expires: "expires",
            data: "data",
        },
    },
}

var sessionStore = new MySQLStore(db_options)

const session_options = {
    key: process.env.COOKIE_KEY,
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    name: "rakazone",
    cookie: {
        sameSite: false,
        secure: false,
    }
}

let _session = session(session_options)





export default _session
