// Transports
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const Websockets = require('libp2p-websockets')
const WebrtcStar = require('libp2p-webrtc-star')
const wrtc = require('wrtc')
// Stream Muxer
const Mplex = require('libp2p-mplex')
// Connection Encryption
const { NOISE } = require('libp2p-noise')
// Peer Discovery
const Bootstrap = require('libp2p-bootstrap')
const MDNS = require('libp2p-mdns')
const KadDHT = require('libp2p-kad-dht')
// PubSub implementation
const Gossipsub = require('libp2p-gossipsub')
const PeerId = require('peer-id')
const idJSON = require('../id.json')
const Protector  = require('libp2p/src/pnet')

const fs = require('fs')
var path = require('path')
const uint8arrayFromString = require('uint8arrays/from-string')

const config = (peerId, listenAddr, bootstrapAPIs, swarmKey) => {
    return Libp2p.create({
        peerId,
        addresses: {
            listen: listenAddr
        },
        modules: {
            transport: [ TCP, Websockets, WebrtcStar ],
            streamMuxer: [ Mplex ],
            connEncryption: [ NOISE ],
            peerDiscovery: [ Bootstrap, MDNS ],
            dht: KadDHT,
            pubsub: Gossipsub,
            connProtector: new Protector(uint8arrayFromString(swarmKey))
        },
        config: {
            transport : {
                [WebrtcStar.prototype[Symbol.toStringTag]]: {
                    wrtc
                }
            },
            peerDiscovery: {
                bootstrap: {
                    list: bootstrapAPIs
                }
            },
            dht: {
                enabled: true,
                randomWalk: {
                    enabled: true
                }
            }
        }
    })
}

module.exports.createNode = async (bootstrapAPI, swarmKey) => {
    const peerId = await PeerId.createFromJSON(idJSON)
    const addrs = [
        '/ip4/0.0.0.0/tcp/0',
        '/ip4/0.0.0.0/tcp/0/ws',
        `/ip4/${bootstrapAPI.server}/tcp/15555/ws/p2p-webrtc-star/`
    ]
    const bootstrap = []
    bootstrap.push(`/ip4/${bootstrapAPI.server}/tcp/63785/ipfs/${bootstrapAPI.address}`)
    const node = await config(peerId, addrs, bootstrap, swarmKey)
    await node.start()
    return node
}