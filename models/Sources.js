const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const Sources = new Schema ({
    id: {type: Number},
    name: {type: String, required: true},
    label: {type: String, required: true},
    mode: {type: String, required: true}
})

module.exports = model('Sources', Sources)