'use strict'
const p2pConfig = require('./config/p2p.config')
const TopicIO =  require('./src/topic.router.io')
const ProtocolIO = require('./src/protocol.router.io')
const auth = require('./src/crypto/auth')

;(async () => {

  const libp2p = await p2pConfig.createNode({server: '192.168.100.105', address: 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'});

  libp2p.connectionManager.on('peer:connect', (connection) => {
    console.info(`Connected to ${connection.remotePeer.toB58String()}!`)
  })

  /**
   * Define interface type
   * ProtocolIO - protocol
   * TopicIO - router
   **/

  const router = new TopicIO(libp2p);
  const protocol = new ProtocolIO(libp2p);

  let content = 'image'
  let jobID = 'e157f340cd75851397a9d248b367008949dae2'

  /**
   * Type: Protocol
   * Method: Listen
   * protocol.link (url/content/jobId)
   * res(from, message)
   **/

  await protocol.link(`/p2p/protocol/0.0.1/${content}/${jobID}`, (res) => {
    console.log('protocol res: ', res);
  })

  /**
   * Type: Protocol
   * Method: Send
   * protocol.push (url/content/jobId, event, message)
   * res(from, message)
   **/
  setInterval(() => {
    protocol.push(`/p2p/protocol/0.0.1/${content}/${jobID}`, '', '123456')
  }, 3000)


  /**
   * Type: Protocol
   * Method: Send (send message direct to destination (p2p) )
   * protocol.pin (url/content/jobId, event, destination, message)
   * res(from, message)
   **/
   //  setInterval(async function () {
   //   await protocol.pin(`/p2p/protocol/0.0.1/${content}/${jobID}`, '', 'QmNNp4eaHgebbAja8dDYcLrYVBzqNsiBS99cZSgSvtfqVA', 'AAAA')
   // }, 3000)
   //

  /**
   * Type: Router
   * Method: link ( get message from subscribed endpoint)
   * router.link (url/content/jobId, callback(response))
   * res(from, message, event)
   **/

  // router.link(`/p2p/router/1.0.0/${content}/${jobID}`, (res) => {
  //   console.log('async listener', res)
  // })

  /**
   * Type: Router
   * Method: link ( get message from subscribed endpoint)
   * router.link (url/content/jobId, callback(response))
   * res(from, message, event)
   **/

  // setInterval(() =>  {
  //     router.push(`/p2p/router/1.0.0/${content}/${jobID}`, 'send-event','Hey Man 2')
  // }, 3000)

})()
