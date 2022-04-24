import pool from './connect.js'
import { get, getOrderBy } from './dbGet.js'
import update from './dbUpdate.js'
import del from './dbDelete.js'
import insert from './dbInsert.js'

export const Insert = (table, query) => new Promise((reslove, reject) => {
    insert(pool, table, query).then(data => {
        return reslove(data)
    }).catch(err => reject(err))
})


export const Get = (table, query) => new Promise((reslove, reject) => {
    get(pool, table, query).then(data => {
        return reslove(data)
    }).catch(err => reject(err))
})

export const Update = (table, query) => new Promise((reslove, reject) => {
    update(pool, table, query).then(data => {
        return reslove(data)
    }).catch(err => reject(err))
})

export const Del = (table, query) => new Promise((reslove, reject) => {
    del(pool, table, query).then(data => {
        return reslove(data)
    }).catch(err => reject(err))
})

export const GetOrderBy = (table, query) => new Promise((reslove, reject) => {
    getOrderBy(pool, table, query).then(data => {
        return reslove(data)
    }).catch(err => reject(err))
})