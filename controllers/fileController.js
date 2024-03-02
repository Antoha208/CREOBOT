// const uuidv4 = require('uuid')
// const path = require('path')
// const fs = require('fs')

// const Application = require('../models/Application')


// class fileController {
//     async uploadAvatar(req, res) {
//         try {
//             const {appName} = req.params
//             const file = req.files.file
//             const app = await Application.findOne({appName: appName})
//             const appImg = uuidv4() + '.jpg'
//             file.mv(path.resolve('static', appImg))

//             // const updatedApp = await Application.updateOne({appName : appName}, {$set: {appImg: appImg}})
//             app.appImg = appImg
//             await app.save()
//             res.json({file, message: 'Img uploaded', app})
//         } catch (error) {
//             console.log(error)
//             res.status(400).json({message: 'Avatar uploading error'})
//         }
//     }

    // async deleteAvatar(req, res) {
    //     try {
    //         const user = await User.findById(req.user.id)
    //         fs.unlinkSync('static' + '\\' + user.avatar)
    //         user.avatar = ''
    //         await user.save()
    //         res.json({message: 'Avatar deleted', user})
    //     } catch (error) {
    //         res.status(400).json({message: 'Avatar deleting error'})
    //     }
    // }

    // async uploadAttachment(req, res) {
    //     try {
    //         const file = req.files.file
    //         const extension = file.name.match(/[^.]+$/gm)[0]
    //         const fileName = uuidv4() + `.${extension}`
    //         file.mv(path.resolve('static', fileName))
            
    //         res.json({message: 'File uploaded', fileName})
    //     } catch (error) {
    //         res.status(400).json({message: 'File uploading error'})
    //     }
    // }

    // async deleteAttachment(req, res) {
    //     try {
    //         const {file} = req.params
    //         fs.unlinkSync('static' + '\\' + file)
           
    //         res.json({message: 'File deleted'})
    //     } catch (error) {
    //         res.status(400).json({message: 'File deleting error'})
    //     }
    // }
// }

// module.exports = new fileController