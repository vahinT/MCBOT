const mineflayer = require('mineflayer')

function createBot() {

  const bot = mineflayer.createBot({
    host: 'VahinM.aternos.me',
    port: 36050,
    username: 'Bot'
  })

  bot.on('spawn', () => {
    console.log('Bot joined!')
    bot.chat('THE BOT JOINS (plz dont kill me, if u kill me vahin will ban u from the server) the bot is required for 24/7 aternos hosting')
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
