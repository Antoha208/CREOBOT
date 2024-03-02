const Users = require('../models/Users')
const bcryptjs = require('bcryptjs')


class usersController {
    async login(req, res) {
        try {
            const {password, username, chatId, fName, lName} = req.body
            const user = await Users.findOne({ username: username })
            const passwordCheck = bcryptjs.compareSync(password, user.password)
            const updatedUser = await user.updateOne({$set: {chatId: chatId, first_name: fName, last_name: lName, authorized: true}})

            if (!passwordCheck) {
                return res.json({message: 'Пароль введен неверно!'})
            }

            return res.json({user, message: 'Добро пожаловать'}) 
        } catch (error) {
            console.log(error)
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await Users.find({chatId: {$ne : 0}})
            
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await Users.find({username: {$ne : 'CashFlow_tech'}})
            
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }

    async getOneUser(req, res) {
        try {
            const {username} = req.params
            const user = await Users.findOne({username: username})
            
            res.json(user)
        } catch (error) {
            console.log(error)
        }
    }

    async getAdmin(req, res) {
        try {
            const {id} = req.params
            const user = await Users.findOne({role: 'Admin'})
            res.json(user)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllUsers(req, res) {
        try {
            await Users.deleteMany({})
            res.json('Users were deleted')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOneUser(req, res) {
        try {
            const {_id} = req.params
            const user = await Users.findOneAndDelete({_id})
            res.json(`user was deleted`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new usersController