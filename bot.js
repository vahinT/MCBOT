const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req, res) => {
  res.write('Bot online')
  res.end()
}).listen(process.env.PORT || 3000)

function createBot() {

  const bot = mineflayer.createBot({
    host: 'VahinM.aternos.me',
    port: 36050,
    username: 'RenderBot',
    version: '1.21.6'
  })

  bot.on('login', () => {
    console.log('Logged in')
  })

  bot.on('spawn', () => {
    console.log('Spawned')
    bot.chat('render bot online')
  })

  bot.on('kicked', console.log)

  bot.on('error', (err) => {
    console.log(err)
  })

  bot.on('end', () => {
    console.log('Disconnected')

    setTimeout(() => {
      createBot()
    }, 5000)
  })
}

createBot()
