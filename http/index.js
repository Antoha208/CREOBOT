const axios = require('axios')
require('dotenv').config()

const $host = axios.create({
    baseURL: process.env.REACT_APP_URL_API
})

module.exports = $host
