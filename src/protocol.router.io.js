const pipe = require('it-pipe')
const PeerId = require('peer-id')

class ProtocolIO {

    constructor(libp2p) {
        this.libp2p = libp2p;
    }
    /**
     * sign (protocol, peerId, message) Sign to network
     * protocol -> to sign end-point
     * bootId -> bootstrap peer id
     * message {
     *     sign: send token to sign to network
     * }
     */
    async sign (protocol, bootId, message) {
        message = message.slice(0, -1)
            const connection = this.libp2p.connectionManager.get(bootId)
            if (!connection) return
            try {
                const { stream } = await connection.newStream([protocol])
                await this._send(message, stream)
            } catch (err) {
                console.error('Could not negotiate chat protocol stream with peer', err)
            }

    }

    async link (address, callback) {
        this.libp2p.handle(address, async ({ connection, stream }) => {
            try {
                await pipe(
                    stream,
                    (source) => (async function * () {
                        for await (const message of source) {
                            let res = {
                                from: connection.remotePeer.toB58String(),
                                message: String(message)
                            }
                            callback(res)
                        }
                    })(),
                    stream
                )
            } catch (err) {
                console.error(err)
            }
        })
    }

    async _pushOne(protocol, event, destination, message) {
        const peers = this.libp2p.peerStore.get(peerId)
        let peerID = peers.get(destination).id
        let peerId = await PeerId.isPeerId(peerID);

        const connection = this.libp2p.connectionManager.get(peerID)
        if (!connection) return

        try {
            const { stream } = await connection.newStream([protocol])
            await this._send(message, stream)
        } catch (err) {
            console.error('Could not negotiate chat protocol stream with peer', err)
        }
    }

    push (protocol, event, message) {
        message = message.slice(0, -1)
        // Iterate over all peers, and send messages to peers we are connected to
        this.libp2p.peerStore.peers.forEach(async (peerData) => {
            // If they dont support the chat protocol, ignore
            if (!peerData.protocols.includes(protocol)) return

            // If we're not connected, ignore
            const connection = this.libp2p.connectionManager.get(peerData.id)
            if (!connection) return

            try {
                const { stream } = await connection.newStream([protocol])
                await this._send(message, stream)
            } catch (err) {
                console.error('Could not negotiate chat protocol stream with peer', err)
            }
        })
    }

    async _send (message, stream) {
        try {
            await pipe(
                [ message ],
                stream,
                async function (source) {
                    for await (const message of source) {
                        console.log('send to :', String(message))
                    }
                }
            )
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = ProtocolIO;