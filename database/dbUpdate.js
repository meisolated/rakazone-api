const update = (pool, table, query) => new Promise((resolve, reject) => {
    pool.query(`UPDATE ${table} SET ${query}`, (err, rows, fields) => {
        if (err) return reject(err)
        return resolve(rows)
    })
})

export default update