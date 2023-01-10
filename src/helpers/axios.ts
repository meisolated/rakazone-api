import axios from "axios"

const axios_simple_get = (url: string) =>
    new Promise((reslove, reject) => {
        axios
            .get(url)
            .then(async ({ data }) => {
                return reslove(data)
            })
            .catch((err) => reject(err))
    })

export { axios_simple_get }
