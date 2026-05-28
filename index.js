const mineflayer = require('mineflayer')
const http = require('http')

const PORT = process.env.PORT || 3000

// REQUIRED FOR RENDER
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot online')
}).listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`)
})

function startBot() {

  console.log('========================')
  console.log('Starting bot...')
  console.log('========================')

  console.log('Creating bot instance...')

  const bot = mineflayer.createBot({
    host: 'jewelfish.aternos.host',
    port: 36050,
    username: 'RenderBot',

    auth: 'offline',
    version: false,

    connectTimeout: 15000,
    checkTimeoutInterval: 10000,

    hideErrors: false
  })

  console.log('Bot instance created')

  bot.on('login', () => {
    console.log('[EVENT] login')
  })

  bot.on('spawn', () => {
    console.log('[EVENT] spawn')
    console.log('Bot joined successfully')

    bot.chat('im online')
  })

  bot.on('message', (msg) => {
    console.log('[CHAT]', msg.toString())
  })

  bot.on('kicked', (reason) => {
    console.log('[EVENT] kicked')
    console.log(reason)
  })

  bot.on('end', (reason) => {
    console.log('[EVENT] end')
    console.log(reason)

    console.log('Reconnecting in 10 seconds...')

    setTimeout(startBot, 10000)
  })

  bot.on('error', (err) => {
    console.log('[EVENT] error')
    console.log(err)
  })
}

startBot()
