const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const Users = new Schema ({
    id: {type: Number, required: true},
    username: {type: String},
    password: {type: String},
    role: {type: String, default: 'User'},
    first_name: {type: String},
    last_name: {type: String},
    webName: {type: String, required: true},
    chatId: {type: Number},
    regDate: {type: Date, default: Date.now()},
    authorized: {type: Boolean, default: false}
})

module.exports = model('Users', Users)