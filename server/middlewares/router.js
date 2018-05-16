/**
 * Created by Neil
 * 2018-05-16 16:18
 */
const { Route } = require('../utils/decorator')
const { resolve } = require('path')

export const router = app => {
    const apiPath = resolve(__dirname, '../routes')

    const router = new Route(app, apiPath)
    router.init()
}