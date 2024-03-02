const Router = require('express')

const usersController = require('../controllers/usersController')

const usersRouter = new Router()


// usersRouter.get('/finduser', usersController.findUser)
usersRouter.get('/getUsers', usersController.getUsers)
usersRouter.get('/getAllUsers', usersController.getAllUsers)
usersRouter.get('/getAdmin', usersController.getAdmin)
usersRouter.get('/getOneUser' + '/:username', usersController.getOneUser)
// usersRouter.post('/registration', usersController.registration)
usersRouter.post('/login', usersController.login)


module.exports = usersRouter