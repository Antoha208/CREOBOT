const $host = require('./index.js')

const getCreos = async () => {
    const {data} = await $host.get('/api/creos')
    return data
}

const getOneCreo = async (creoName) => {
    const {data} = await $host.get('/api/getOneCreo/' + creoName)
    return data
}

const getAppsToCheck = async () => {
    const {data} = await $host.get('/api/appsToCheckBan')
    return data
}

const getAppsToBot = async (username) => {
    const {data} = await $host.get('/api/appstobot/' + username)
    return data
}

const updateAppFree = async (_id, web, source) => {
    const {data} = await $host.put('/api/updateAppFree/' + _id, {web, source})
    return data 
}

const updateAppToBan = async (_id) => {
    const {data} = await $host.put('/api/updateAppToBan/' + _id)
    return data 
} 

module.exports = {getCreos, getOneCreo, getAppsToCheck, getAppsToBot, updateAppFree, updateAppToBan}