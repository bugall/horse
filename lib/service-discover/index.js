const Eventer = require('./eventer')
const Dispatch = require('../dispatch')
const config = require('../config')
const Store = require('../store')
const uuid = require('uuid/v4')

const myEventer = new Eventer()
const myDispatch = new Dispatch()
const myStore = new Store()


function ServiceDiscover(opts) {
    this.opts = opts
    this.mcDelegate
}

ServiceDiscover.prototype.create = function(opts) {
    switch (opts.type) {
        case 'redis':
            const Redis = require('./mcRedis')
            this.mcDelegate = new Redis(opts)
            break;
        default:
            break;
    }
    const self = this
    this.mcDelegate.start().then(function(connector) {
        const 
        self.getNewNode()
    })
}

ServiceDiscover.prototype.iamReadyOnline = function(data) {
    
}

ServiceDiscover.prototype.getNewNode = function(data) {
}

ServiceDiscover.prototype.bindEvents = function() {
    myDispatch.bind(config.events.service_discover.new_node_online,
        this.getNewNode)
}

ServiceDiscover.prototype.getSelfServerInfo = function() {
    const info = {}
    info.host_id = uuid()
    info.intranet_ip =  '1.1.1.1'
    return info
}

ServiceDiscover.prototype.mcRedis = function() {
    const redis = require('redis')
}

exports = module.exports = ServiceDiscover;