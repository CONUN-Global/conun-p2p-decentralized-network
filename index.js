'use strict'
const PubsubChat = require('./src/helper/topic')
const p2pConfig = require('./config/p2p.config')
const TopicIO =  require('./src/topic.router.io')
const ProtocolIO = require('./src/protocol.router.io')

;(async () => {
  // Create the Node
  const libp2p = await p2pConfig.createNode();
  // Listen on libp2p for `peer:connect` and log the provided connection.remotePeer.toB58String() peer id string.
  libp2p.connectionManager.on('peer:connect', (connection) => {
    console.info(`Connected to ${connection.remotePeer.toB58String()}!`)
  })

  const router = new TopicIO(libp2p, PubsubChat);
  const protocol = new ProtocolIO(libp2p)

  await protocol.link('/libp2p/chat/1.0.0', (res) => {
    console.log('protocol res: ', res)
  })

  setInterval(() => {
    protocol.push('/libp2p/chat/1.0.0', '', '123456')
  }, 5000)

  router.link('/libp2p/conun/aaa/1.0.0', (res) => {
    console.log('callme baby', res)
  })

  setInterval(()=>  {
      router.pub('/libp2p/conun/aaa/1.0.0', 'send-event','Hey Man 2')
  }, 3000)

})()
