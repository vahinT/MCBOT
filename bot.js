const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req, res) => {
  res.write('Bot is running!')
  res.end()
}).listen(process.env.PORT || 3000)

function createBot() {

  const bot = mineflayer.createBot({
    host: 'VahinM.aternos.me',
    port: 36050,
    username: 'RenderBot'
  })

  bot.on('spawn', () => {
    console.log('Bot joined!')
    bot.chat('DO NOT KILL ME, OR ELSE VAHIN WILL BAN YOU, THIS IS NEEDED FOR 24/7 HOSTING')
  })

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 5 seconds...')

    setTimeout(() => {
      createBot()
    }, 5000)
  })

  bot.on('kicked', console.log)
  bot.on('error', console.log)
}

createBot()
