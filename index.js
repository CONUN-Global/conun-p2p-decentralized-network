'use strict'
const p2pConfig = require('./config/p2p.config')
const TopicIO =  require('./src/topic.router.io')
const ProtocolIO = require('./src/protocol.router.io')
const auth = require('./src/crypto/auth')


;(async () => {

  /**
   * create peer id
   * generating id, public and private keys
   * use only onetime
   **/
  // await auth.createPeerID()

  const libp2p = await p2pConfig.createNode({server: '192.168.100.105', address: 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'});

  libp2p.connectionManager.on('peer:connect', (connection) => {
    console.info(`Connected to ${connection.remotePeer.toB58String()}!`)
  })

  /**
   * Define interface type
   * ProtocolIO
   * TopicIO
   **/
  const router = new TopicIO(libp2p);
  const protocol = new ProtocolIO(libp2p);

  let content = 'image'
  let jobID = 'e157f340cd75851397a9d248b367008949dae2'

  /**
   * Define interface type
   * protocol.link (url/content/jobId)
   * res(from, message)
   **/
  await protocol.link(`/p2p/protocol/0.0.1/${content}/${jobID}`, (res) => {
    console.log('protocol res: ', res);
  })

  /**
   * Define interface type
   * protocol.push (url/content/jobId, )
   * res(from, message)
   **/
  setInterval(() => {
    protocol.push(`/p2p/protocol/0.0.1/${content}/${jobID}`, '', '123456')
  }, 3000)

  // router.link('/libp2p/conun/aaa/1.0.0/0xd819e788ae9b97ce157f340cd75851397a9d248b367008949dae2c7b87b56475', (res) => {
  //   console.log('callme baby', res)
  // })
  //
  // setInterval(() =>  {
  //     router.push('/libp2p/conun/aaa/1.0.0/0xd819e788ae9b97ce157f340cd75851397a9d248b367008949dae2c7b87b56475', 'send-event','Hey Man 2')
  // }, 3000)

})()
