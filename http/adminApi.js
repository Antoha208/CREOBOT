const $host = require('./index.js')


const getPartnersWithService = async () => {
    const {data} = await $host.get('/api/admin/partnersWithService')
    return data
} 

module.exports = { getPartnersWithService }