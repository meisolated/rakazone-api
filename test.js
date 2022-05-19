import fetch from 'node-fetch'
let url = "https://i.ytimg.com/vi/PjNfTFGrDCE/maxresdefault.jpg"

function urlExists(url, callback) {
    fetch(url, { method: 'head' })
        .then(function (status) {
            callback(status.ok)
        })
}

urlExists(url, (x) => {

    console.log(x)
})