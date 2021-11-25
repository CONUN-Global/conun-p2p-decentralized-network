# CONUN Manager Application
![Minimum Node Requirement](https://img.shields.io/badge/node-%3E%3D10.0.0-brightgreen.svg)
![NPM](https://img.shields.io/npm/v/npm)
<br/>
<p align="center">
  <img alt="CONUN preview" src="https://raw.githubusercontent.com/CONUN-Global/conun-homepage/fcc7721617445e0fa571ac00bc8463ee3716ada8/src/assets/icons/conun-logo.svg" height="60" />
  <br><br>
  <p align="center">CONUN DECENTRALIZED NETWORK (P2P) </p>

<p align="center"> 
This is conun-p2p-network module for implementing to Node.js 
</p>
<br/>
<br/>

## CONUN DECENTRALIZED NETWORK MODULE
  

## Project Status
This project is still in Alpha, lots of development is happening, API might change.
The documentation in the master branch may contain changes from a pre-release. If you are looking for the documentation of the latest release, you can view the latest release on npm.

## Lead Maintainer
[Saidov Jamshid](https://github.com/ruffiano)

## Development
### :wrench: Installation
You can use npm to install dependencies, to do;

|NPM ||
| :------: | :------: |
| `npm install @CONUN-Global/conun-p2p-network` |

That's it!

## How to Play

Network Configuration
``` js
CONUNP2P.Config.createNode({server: 'BOOT_SERVER_IP', address: 'BOOT_PEER_ADDRES'}, 'SWARM_KEY')
```

Define Interfaces Type:
- ProtocolIO - protocol
- TopicIO - router

``` js
  router = new CONUNP2P.TopicIO(p2p)
  protocol = new CONUNP2P.ProtocolIO(p2p)
```

## Protocol IO
  
Protocol Type: protocol | 
Method: Listener
- protocol.link (url/content/jobId)
- res(from, message, event)
  
``` js
  await protocol.link(`/p2p/protocol/0.0.1/${content}/${jobID}`, (res) => {
  ''' your code here'''
  })
```


Protocol Type: protocol | 
Method: Send
- protocol.push (url/content/jobId, event, message)

``` js
  protocol.push(`/p2p/protocol/0.0.1/${content}/${jobID}`, 'event-name', 'message')
```


Protocol Type: protocol | 
Method: Send (send message direct to destination (p2p) )
- protocol.pin (url/content/jobId, event, destination_peer_id, message)
- res(from, message, event)

``` js
  await protocol.pin(`/p2p/protocol/0.0.1/${content}/${jobID}`, '', 'destination_peer_id', 'message')
```

## Topic IO
Protocol Type: Router |
Method: link ( get message from subscribed endpoint)
- router.link (url/content/jobId, callback(response))
- res(from, message, event)

``` js
    router.link(`/p2p/router/1.0.0/${content}/${jobID}`, (res) => {
       ''' your code here'''
    })
```

Protocol Type: Router |
Method: link ( get message from subscribed endpoint)
- router.link (url/content/jobId, callback(response))
- res(from, message, event)
``` js
  router.push(`/p2p/router/1.0.0/${content}/${jobID}`, 'event-name', 'message')
```

<br/>
<img alt="CONUN preview" src="https://camo.githubusercontent.com/79fcdc7c43f1a1d7c175827976ffee8177814a016fb1b9578ff70f1aef759578/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f646973636f72642e737667" height="25" />
<br/>

Ask from Developers [Discord](https://discord.gg/VvXvQfa3Za)


Released since 2021.02.22

