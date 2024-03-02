const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bot = require('./bot')
const fileUpload = require('express-fileupload')
const creosRouter = require('./routes/creosRouter')
const usersRouter = require('./routes/usersRouter')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(fileUpload())
app.use(express.static('static'))
app.use('/api', cors(), creosRouter)
app.use('/api/users', cors(), usersRouter)
// app.use('/api/admin', cors(), adminRouter)


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(process.env.PORT, () => console.log(`server started on PORT: ${process.env.PORT}`))
    } catch (error) {
        console.log('Подключение к базе данных не установилось')
    }
}

dbConnection()