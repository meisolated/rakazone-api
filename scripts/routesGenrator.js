const fs = require("fs")
const routes = ["content", "session", "analytics", "logout", "redirects", "streamerData", "userData", "videoData", "watchHistory"]

const content = `import { Request, Response } from "express"
                export default function (app: any, path: any) {
                console.log("Loaded route: " + path)
                app.get(path, async (req: Request, res: Response) => {
                return res.send({  })
                })
                }
`
routes.forEach(route => {
    fs.writeFile("./src/routes/" + route + ".ts", content, () => {
        console.log("Done I guess")
    })

})