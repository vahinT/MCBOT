
const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req, res) => {
  res.write('Bot online')
  res.end()
}).listen(process.env.PORT || 3000)

function startBot() {

  console.log('Starting bot...')

  const bot = mineflayer.createBot({
    host: 'VahinM.aternos.me',
    port: 36050,
    username: 'RenderBot',
    version: '1.21.6'
  })

  bot.once('spawn', () => {
    console.log('Bot joined server!')
    bot.chat('im online')
  })

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...')

    setTimeout(() => {
      startBot()
    }, 10000)
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('Error:', err.message)
  })
}

startBot()
