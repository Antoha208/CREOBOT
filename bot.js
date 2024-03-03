const TelegramBot = require('node-telegram-bot-api')
const { login, getAllUsers, getOneUser, getAdmin } = require('./http/usersApi')
const { getCreos, getOneCreo } = require('./http/creosApi')
require('dotenv').config()

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    const ids = await getAllUsers().then(list => list.map(el => el.chatId))
    const chatFName = msg.chat.first_name
    const chatLName = msg.chat.last_name
    const username = msg.chat.username

    const {authorized} = await getOneUser(username)

    if (!msg.web_app_data) {
        if (text === '/start') {
            await bot.sendMessage(chatId, 'Привет! Введите ключ')
        } else if (text === 'Список всех шаблонов' && authorized) {
            await getCreos().then(list => {
                bot.sendMessage(chatId, 'Список всех шаблонов. Чтобы посмотреть превью, нажми на кнопку', {
                    reply_markup: JSON.stringify({
                        inline_keyboard: list.map(el => 
                            [{text: `${el.creoName}  |  ${el.hashes.map(hash => `#${hash}`).join(' ')}  |  ${el.duration}`, callback_data: el.creoName}]
                        )
                    })
                })
            })
        } else {
            await login(text, username, chatId, chatFName, chatLName).then(async (pass) => {
                if (pass.message === 'Добро пожаловать') {
                    if (pass.user.role === 'User') {
                        await bot.sendMessage(chatId, `Привет, ${pass.user.webName}!`, {
                            reply_markup: {
                                keyboard: [
                                    [{text: 'Список всех шаблонов'}],
                                ]
                            }
                        })
                        await getCreos().then(list => {
                            bot.sendMessage(chatId, 'Список всех шаблонов. Чтобы посмотреть превью, нажми на кнопку', {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: list.map(el => 
                                        [{text: `${el.creoName}  |  ${el.hashes.map(hash => `#${hash}`).join(' ')}  |  ${el.duration}`, callback_data: el.creoName}]
                                    )
                                })
                            })
                        })
                    } else {
                        await bot.sendMessage(chatId, `Привет, ${pass.user.webName}!`, {
                            reply_markup: {
                                keyboard: [
                                    [{text: 'Добавить шаблон', web_app: {url: process.env.WEB_APP_URL_FORM}}],
                                    [{text: 'Удалить шаблон'}],
                                    [{text: 'Список всех шаблонов'}],
                                ]
                            }
                        })
                    }
                } else {
                    await bot.sendMessage(chatId, 'Неверный ключ!')
                }
            })
        }
    }


    if (msg.web_app_data) {
        const parsedData = JSON.parse(msg?.web_app_data?.data)

        switch (parsedData.action) {
            case 'add':
                try {
                    ids.forEach(async el => {
                        await bot.sendVideo(el, `./static/${parsedData.creoVideo}`, {
                            caption: 
`🔥Новый шаблон 

🎰${parsedData.creoName}
    
${parsedData.hashes.map(hash => `#${hash}\n`).join('')}
Референсы: ${parsedData.refers}
    
Длительность: ${parsedData.duration} сек

Форматы: ${parsedData.formats}`,
                        })
                    })
                } catch (error) {
                    await bot.sendMessage(chatId, 'Ошибка добавления')
                }
                break;
            default:
                break;
        }
    }
})


bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id
    const username = msg.from.username
    const messageId = msg.message.message_id
    const chatIdFrom = msg.from.id

    const admin = await getAdmin()

    if (data.startsWith('Заказать')) {
        const template = data.match(/[A-z]+[0-9]+/gm)?.join('')

        await bot.editMessageReplyMarkup({
            inline_keyboard: []
        }, {
            chat_id: chatIdFrom, 
            message_id: messageId
        })

        await bot.sendMessage(admin.chatId, `${username} хочет заказать шаблон ${template}`)
        await bot.sendMessage(chatId, `Запрос направлен Менеджеру`)
    } else {
        // function delay(ms) {
        //     return new Promise((resolve) => setTimeout(resolve, ms))
        // }
        // await delay(2000)
        const oneCreo = await getOneCreo(data)
        try {
            await bot.sendVideo(chatId, `./static/${oneCreo.creoVideo}`, {
                caption: 
`Шаблон: ${oneCreo.creoName}
    
🎰${oneCreo.creoName}
    
${oneCreo.hashes.map(hash => `#${hash}\n`).join('')}
Референсы: ${oneCreo.refers}

Длительность: ${oneCreo.duration} сек
    
Форматы: ${oneCreo.formats}`
// ,
//                 reply_markup: {
//                     inline_keyboard: [
//                         [{text: `Заказать`, callback_data: `Заказать ${oneCreo.creoName}`}]
//                     ]
//                 }
            })
        } catch (error) {
            console.log(error)
            await bot.sendMessage(chatId, 'Ошибка вывода')
        }
    }
    
})


module.exports = {bot}