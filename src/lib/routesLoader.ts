import fs from "fs"

const loadFolderRoutes = (
    app: any,
    routesDir: string,
    mainRoute: string,
    disableLogging: boolean
) => {
    fs.readdir(routesDir, (err: any, files: any) => {
        if (err) return err
        files.forEach(async (file: any) => {
            if (file.includes(".js")) {
                let route = `/${file}`
                route = routesDir.split("routes")[1] + route
                route = route.split(".js")[0]
                route = route.includes("index")
                    ? route.split("index")[0]
                    : route
                route = "/" + mainRoute + route
                if (!disableLogging) console.log(`Loading route: ${route}`)
                await import(`${routesDir}/${file}`).then((fun) =>
                    fun.default(app, route)
                )
            } else {
                const nextFolderPath = `${routesDir}/${file}`
                loadFolderRoutes(app, nextFolderPath, mainRoute, disableLogging)
            }
        })
    })
}

/**
 * @description Load Express Routes Dynamically
 * @author meisolated
 * @date 31/08/2022
 * @param app: Express App
 * @param routesDir: Routes Full Directory Path
 * @param mainRoute : Route Prefix
 * @param disableLogging : Routes Loading Logging
 */
export default function LoadRoutes(
    app: any,
    routesDir: string,
    mainRoute: string,
    disableLogging: boolean
) {
    if (fs.existsSync(routesDir)) {
        loadFolderRoutes(app, routesDir, mainRoute, disableLogging)
    } else {
        throw new Error("Routes directory not found")
    }
}
