const mineflayer = require('mineflayer')
const http = require('http')

const PORT = process.env.PORT || 3000

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot online')
}).listen(PORT)

console.log(`Web server running on port ${PORT}`)

function startBot() {

  console.log('========================')
  console.log('Starting bot...')
  console.log('Host: VahinM.aternos.me')
  console.log('Port: 36050')
  console.log('Username: RenderBot')
  console.log('========================')

  const bot = mineflayer.createBot({
    host: 'VahinM.aternos.me',
    port: 36050,
    username: 'RenderBot',

    // auto detect version
    version: false,

    // cracked server
    auth: 'offline',

    hideErrors: false
  })

  bot.on('inject_allowed', () => {
    console.log('[EVENT] inject_allowed')
  })

  bot.on('login', () => {
    console.log('[EVENT] login')
  })

  bot.on('spawn', () => {
    console.log('[EVENT] spawn')
    console.log('Bot joined server successfully!')

    bot.chat('im online')
  })

  bot.on('message', (jsonMsg) => {
    console.log('[CHAT]', jsonMsg.toString())
  })

  bot.on('kicked', (reason, loggedIn) => {
    console.log('========================')
    console.log('[EVENT] kicked')
    console.log('Logged in:', loggedIn)
    console.log('Reason:', reason)
    console.log('========================')
  })

  bot.on('end', (reason) => {
    console.log('========================')
    console.log('[EVENT] end')
    console.log('Disconnected reason:', reason)
    console.log('Reconnecting in 10 seconds...')
    console.log('========================')

    setTimeout(() => {
      startBot()
    }, 10000)
  })

  bot.on('error', (err) => {
    console.log('========================')
    console.log('[EVENT] error')
    console.log(err)
    console.log('========================')
  })

  bot.on('death', () => {
    console.log('[EVENT] death')
  })

  bot.on('health', () => {
    console.log('[EVENT] health update')
  })

  bot.on('playerJoined', (player) => {
    console.log(`[EVENT] player joined: ${player.username}`)
  })

  bot.on('playerLeft', (player) => {
    console.log(`[EVENT] player left: ${player.username}`)
  })
}

startBot()
