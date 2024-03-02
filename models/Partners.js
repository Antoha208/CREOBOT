const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const Partners = new Schema ({
    id: {type: Number},
    partnerId: {type: String},
    name: {type: String},
    naming: {type: String},
    visability: {type: Boolean, default: true}
})

module.exports = model('Partners', Partners)