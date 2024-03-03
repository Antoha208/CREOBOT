const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')


const Creo = require('../models/Creo')
const Users = require('../models/Users')
const Partners = require('../models/Partners')
const Sources = require('../models/Sources')


class creosController {
    async addNewCreo(req, res) {
        try {
            const {creoName, geo, hashes, refers, duration, formats} = req.body
            const condidate = await Creo.findOne({creoName})
            const count = await Creo.find()
            
            if (condidate) {
                return res.status(400).json({message: 'Данный шаблон уже есть в базе'})
            }
            const release_date = Date.now()

            const file = req.files.file
            console.log(file)
            const creoVideo = uuidv4() + `${creoName}.mp4`
            file.mv(path.resolve('static', creoVideo))

            const creo = new Creo({
                id: count.length + 1, 
                creoName: creoName,
                creoVideo: creoVideo,
                geo: geo, 
                hashes: hashes.split(','),
                refers: refers,
                duration: duration,
                formats: formats,
                release_date: release_date,
            })
            await creo.save()
            return res.json(creo)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Креатив не был добавлен'})
        }
    }

    async getCreos(req, res) {
        try {
            const creos = await Creo.find()
            res.json(creos)
        } catch (error) {
            console.log(error)
        }
    }

    async getOneCreo(req, res) {
        try {
            const {creoName} = req.params
            const creo = await Creo.findOne({creoName: creoName})

            if (creo) {
                res.json(creo)
            } else {
                res.status(400).json({message: 'Не удалось найти шаблон'})
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCreo(req, res) {
        try {
            const {_id} = req.params
            const creo = await Creo.findById({_id})
            if (creo.creoVideo && creo.creoVideo !== '') {
                fs.unlinkSync('static' + '\\' + creo.creoVideo)
            }
            await creo.deleteOne({_id: _id})
            // user.avatar = ''
            // await app.save()
            res.json(`Шаблон удален`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new creosController