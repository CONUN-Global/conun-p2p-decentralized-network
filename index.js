'use strict'
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

  const router = new TopicIO(libp2p);
  const protocol = new ProtocolIO(libp2p);

  await protocol.link('/p2p/chat/0.0.1/', (res) => {
    console.log('protocol res: ', res)
  })

  setInterval(() => {
    protocol.push('/p2p/chat/0.0.1/', '', '123456')
  }, 5000)

  // router.link('/libp2p/conun/aaa/1.0.0/0xd819e788ae9b97ce157f340cd75851397a9d248b367008949dae2c7b87b56475', (res) => {
  //   console.log('callme baby', res)
  // })
  //
  // setInterval(() =>  {
  //     router.push('/libp2p/conun/aaa/1.0.0/0xd819e788ae9b97ce157f340cd75851397a9d248b367008949dae2c7b87b56475', 'send-event','Hey Man 2')
  // }, 3000)

})()
