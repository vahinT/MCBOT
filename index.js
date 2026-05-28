const mineflayer = require('mineflayer')
const http = require('http')

const PORT = process.env.PORT || 3000

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot online')
}).listen(PORT)

console.log(`Web server running on port ${PORT}`)

function startBot() {

  console.log('Starting bot...')

  const bot = mineflayer.createBot({
    host: 'VahinM.aternos.me',
    port: 36050,
    username: 'RenderBot',
    version: '1.21.6',

    // helps prevent timeout issues
    hideErrors: false
  })

  bot.once('spawn', () => {
    console.log('Bot joined server!')
    
    bot.chat('im online')

    // anti-afk tiny movement
    setInterval(() => {
      if (!bot.entity) return

      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)

    }, 60000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(`<${username}> ${message}`)
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('Error:', err.message)
  })

  bot.on('end', () => {
    console.log('Bot disconnected.')
    console.log('Reconnecting in 10 seconds...')

    setTimeout(() => {
      startBot()
    }, 10000)
  })
}

startBot()
