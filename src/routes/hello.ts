export default function (app: any, path: any) {
    console.log(`Loaded route: ${path}`)
    app.get(path, async (req: any, res: any) => {
        return res.json({ test: "test1" })
    })
}