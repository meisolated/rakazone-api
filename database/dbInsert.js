const insert = (pool, table, what) => new Promise((resolve, reject) => {

    let q = `INSERT INTO ${table} ${what}`
    pool.query(q, (err, rows, fields) => {
        if (err) return reject(err)
        return resolve(rows)
    })
})

export default insert