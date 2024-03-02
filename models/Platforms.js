const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const Platforms = new Schema ({
    id: {type: Number},
    value: {type: String},
    label: {type: String}
})

module.exports = model('Platforms', Platforms)