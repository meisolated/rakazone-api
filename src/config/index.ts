import "dotenv/config"
const config: any = {
    mongoUri:
        process.env.NODE_ENV == "dev"
            ? process.env.MONGO_DEV_URI
            : process.env.MONGO_PRO_URI,
}
export default config
