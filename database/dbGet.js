export const get = (pool, table, where) => new Promise((resolve, reject) => {

    let q = where ? `SELECT * FROM ${table} WHERE ${where}` : `SELECT * FROM ${table}`
    pool.query(q, (err, rows, fields) => {
        if (err) return reject(err)
        return resolve(rows)
    })
})

export const getOrderBy = (pool, table, orderBy) => new Promise((resolve, reject) => {
    let q = `SELECT * FROM ${table} ORDER BY ${orderBy}`
    pool.query(q, (err, rows, fields) => {
        if (err) return reject(err)
        return resolve(rows)
    })
})