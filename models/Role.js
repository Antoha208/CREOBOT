const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const Role = new Schema ({
    value: {type: String, default: 'User'},
})

module.exports = model('Role', Role)