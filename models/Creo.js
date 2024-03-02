const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const Creo = new Schema ({
    id: {type: String},
    key: {type: Date, default: Date.now()},
    // partner: {type: String, ref: 'Partners'},
    creoName: {type: String},
    creoVideo: {type: String, default: ''},
    // platform: {type: String, default: ''},
    // web: {type: String, default: 'Свободная'},
    // sources: {type: Object, ref: 'Sources'},
    geo: {type: Array}, //отдельная коллекция
    hashes: {type: Array}, //отдельная коллекция....
    release_date: {type: Date, default: Date.now()},
    duration: {type: String},
    formats: {type: String, default: 'Можно лить'}
})

module.exports = model('Creo', Creo)