const PubsubChat = require('./helper/topic')

class TopicRouterIo {
    constructor(libp2p) {
        this.libp2p = libp2p;
        this.pubsubChat = null;
        this.PubsubChat = PubsubChat;
    }

    link (topic, callback)  {
        this.pubsubChat = new this.PubsubChat(this.libp2p, topic, ({ from, message, event }) => {
            let res = { from, message, event }
            callback(res);
        });
    }


    push(topic, event, message) {
        if (this.pubsubChat.checkCommand(message)) return
        this.pubsubChat.topic = topic
        this.pubsubChat.send(event, message, (err) => {
            if (err) console.error('Could not publish chat', err)
        })
    }

}

module.exports = TopicRouterIo;
