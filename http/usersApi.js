const $host = require('./index.js')

const login = async (password, username, chatId, fName, lName) => {
    const {data} = await $host.post('/api/users/login', {password, username, chatId, fName, lName})
    return data
}

const getAllUsers = async () => {
    const {data} = await $host.get('/api/users/getAllUsers')
    return data
} 

const getUsers = async () => {
    const {data} = await $host.get('/api/users/getUsers')
    return data
} 

const getOneUser = async (username) => {
    const {data} = await $host.get('/api/users/getOneUser/' + username)
    return data
}

const getAdmin = async () => {
    const {data} = await $host.get('/api/users/getAdmin')
    return data
} 

module.exports = {login, getUsers, getAllUsers, getOneUser, getAdmin}