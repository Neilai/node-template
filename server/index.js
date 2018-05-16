const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/index.js')
const R = require('ramda')
const MIDDLEWARES = ['router',"common"]

const useMiddlewares = (app) => {index
        R.map(
            R.compose(
                R.forEachObjIndexed(
                    initWith => initWith(app)
                ),
                require,
                name => resolve(__dirname, `./middlewares/${name}`)
            )
        )(MIDDLEWARES)
    }

;(async () => {
    await connect()

    initSchemas()

    await initAdmin()

    const app = new Koa()
    await useMiddlewares(app)
    console.log("start");
    app.listen(4455)

})()
