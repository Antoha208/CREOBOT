const Router = require('express')

const creosController = require('../controllers/creosController')

const creosRouter = new Router()


creosRouter.post('/addNewCreo', creosController.addNewCreo)

creosRouter.get('/creos', creosController.getCreos)
creosRouter.get('/getOneCreo' + '/:creoName', creosController.getOneCreo)

creosRouter.delete('/deleteCreo' + '/:_id', creosController.deleteCreo)

module.exports = creosRouter