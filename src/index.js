'use strict'

const Config = require('../config/p2p.config')
const TopicIO =  require('./topic.router.io')
const ProtocolIO = require('./protocol.router.io')
const auth = require('crypto/auth')

/**
 * @typedef {import('src')} CONUNP2P
 */

module.exports = {
    Config,
    TopicIO,
    ProtocolIO,
    auth
}