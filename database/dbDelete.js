const del = (pool, table, where) => new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ${table} WHERE ${where}`, (err, rows, fields) => {
        if (err) return reject(err)
        return resolve(rows)
    })
})

export default del