const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const Ages = new Schema ({
    id: {type: Number},
    value: {type: String}
})

module.exports = model('Ages', Ages)