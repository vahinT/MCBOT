const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'VahinM.aternos.me',
  port: 36050,
  username: 'Bot'
})

bot.on('spawn', () => {
  console.log('Bot joined!')
  bot.chat('hello from render lol')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  if (message === 'jump') {
    bot.setControlState('jump', true)

    setTimeout(() => {
      bot.setControlState('jump', false)
    }, 1000)
  }
})

bot.on('error', console.log)
bot.on('kicked', console.log)
