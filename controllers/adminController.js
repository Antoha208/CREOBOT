const generatePassword = require('password-generator')
const bcryptjs = require('bcryptjs')
const fs = require('fs')

const Application = require('../models/Application')
const Users = require('../models/Users')
const Partners = require('../models/Partners')
const Sources = require('../models/Sources')
const Ages = require('../models/Ages')
const Platforms = require('../models/Platforms')


class adminController {
    async addNewSource(req, res) {
        try {
            const {sourceName, sourceLabel, mode} = req.body
            const condidate = await Sources.findOne({name: sourceName})
            const sourcesDB = await Sources.find()
            const apps = await Application.find()

            if (condidate) {
                return res.status(400).json({message: 'Данный источник уже есть в базе'})
            }

            const newSource = new Sources({
                id: sourcesDB.length+1, 
                name: sourceName,
                label: sourceLabel,
                mode: mode
            })
            await newSource.save()

            apps.forEach(async app => {
                app.sources[sourceName] = []
                await app.updateOne({$set: {sources: app.sources}})
            })

            return res.json({newSource, message: 'Успешно'})
        } catch (error) {
            res.status(400).json({message: 'Источник не был добавлен'})
        }
    }

    async getSources(req, res) {
        try {
            const sources = await Sources.find()
            res.json(sources)
        } catch (error) {
            console.log(error)
        }
    }

    async getAllPartners(req, res) {
        try {
            const partners = await Partners.find()
            res.json(partners)
        } catch (error) {
            console.log(error)
        }
    }

    async getPartnersWithService(req, res) {
        try {
            const partners = await Partners.find({site: true})
            res.json(partners)
        } catch (error) {
            console.log(error)
        }
    }

    async getPartners(req, res) {
        try {
            const partners = await Partners.find({visability: true})
            res.json(partners)
        } catch (error) {
            console.log(error)
        }
    }

    async getAges(req, res) {
        try {
            const ages = await Ages.find()
            res.json(ages)
        } catch (error) {
            console.log(error)
        }
    }

    async getPlatforms(req, res) {
        try {
            const platforms = await Platforms.find()
            res.json(platforms)
        } catch (error) {
            console.log(error)
        }
    }

    async hideAppsAndPartners(req, res) {
        try {
            const {partnerName} = req.body
            const partnerFromDB = await Partners.findOne({name: partnerName})
            const partner = await partnerFromDB.updateOne({ $set: {visability: !partnerFromDB.visability}})
            
            return res.json({message: 'Успешно'})
        } catch (error) {
            console.log(error)
        }
    }

    async addNewPartner(req, res) {
        try {
            const {partnerName, naming} = req.body
            const partnersQuantity = await Partners.find()
            const condidate = await Partners.findOne({name: partnerName})

            if (condidate) {
                return res.status(400).json({message: 'Данный партнер уже есть в базе'})
            }

            const newPartner = new Partners({
                id: partnersQuantity.length+1,
                partnerId: partnersQuantity.length+1, 
                name: partnerName,
                naming: naming,
                visability: true
            })
            await newPartner.save()

            return res.json({newPartner, message: 'Успешно'})
        } catch (error) {
            res.status(400).json({message: 'Партнер не был добавлен'})
        }
    }

    async addNewWeb(req, res) {
        try {
            const {username, webName} = req.body
            const usersQuantity = await Users.find()
            const condidate = await Users.findOne({username: username})

            if (condidate) {
                return res.status(400).json({message: 'Данный юзер уже есть в базе'})
            }

            const newPassword = generatePassword(20, false)
            const hashedPassword = bcryptjs.hashSync(newPassword, 8)
            
            const user = new Users({
                id: usersQuantity.length+1, 
                username: username,
                webName: webName,
                password: hashedPassword
            })
            await user.save()

            return res.json({user, newPassword, message: 'Успешно'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Юзер не был добавлен'})
        }
    }

    async removeSourceFromAllApps(req, res) {
        try {
            const {sourceName} = req.body
            const source = await Sources.findOneAndDelete({name: sourceName})
            const apps = await Application.find()

            apps.forEach(async app => {
                delete app.sources[sourceName]
                await app.updateOne({$set: {sources: app.sources}})
            })
            
            return res.json({message: 'Успешно'})
        } catch (error) {
            res.status(400).json({message: 'Приложение не было добавлено'})
        }
    }

    async removePartner(req, res) {
        try {
            const {partnerName} = req.params
            const partner = await Partners.findOne({name: partnerName})
            const apps = await Application.find({partner: partner.partnerId})

            apps.forEach(async app => {
                if (app.appImg && app.appImg !== '') {
                    fs.unlinkSync('static' + '\\' + app.appImg)
                }
                await app.deleteOne()
            })

            await Partners.deleteOne({name: partnerName})
            
            return res.json({message: 'Успешно'})
        } catch (error) {
            res.status(400).json({message: 'Ошибка удаления'})
        }
    }

    // async removeWeb(req, res) { 
    //     try {
    //         const {web} = req.body

    //         // const removeWeb = await Users.findOneAndDelete({webName: web})

    //         const apps = await Application.find()

    //         const newArr = apps.filter(app => {
    //             return Object.keys(app.sources).filter(key => {
    //                 return Object.defineProperty(app.sources, `${key}`, {
    //                     value: app.sources[key].filter(source => source !== web)
    //                 })
    //             })
    //         }).forEach(async app => {
    //             await app.updateOne({appName: app.appName}, {$set : {sources: app.sources}})
    //         })

    //         return res.json({message: 'Успешно', newArr})
    //     } catch (error) {
    //         res.status(400).json({message: 'Веб не был удален'})
    //     }
    // }
}

module.exports = new adminController