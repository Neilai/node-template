/**
 * Created by Neil
 * 2018-05-16 11:31
 */
const mongoose = require('mongoose')
const db = 'mongodb://localhost/test'

const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
    const User = mongoose.model('User')
    let user = await User.findOne({
        username: 'Scott'
    })

    if (!user) {
        const user = new User({
            username: 'Neil',
            email: '1131894367@qq.com',
            password: '123456'
        })

        await user.save()
    }
}

exports.connect = () => {
    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }

        mongoose.connect(db)

        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库连接失败')
            }
        })

        mongoose.connection.on('error', err => {
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库连接失败')
            }
        })

        mongoose.connection.once('open', () => {
            resolve()
            console.log('数据库连接成功')
        })
    })
}