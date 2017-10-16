const Eventer = require('./eventer')
const Dispatch = require('../dispatch')
const config = require('../config')
const Store = require('../store')
const uuid = require('uuid/v4')
const os = require('os')

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
    let pubChannelTimer = null
    this.getSelfServerInfo()
    this.startServiceDiscover()
}
ServiceDiscover.prototype.startServiceDiscover = function() {
    const self = this
    this.mcDelegate.start().then(function(connector) {
        console.log('service-discover-->: service-online' )
        self.mcDelegate.subChannel(config.channel.service_discover)
    }).catch(function(err) {
        console.log('service-discover-->: service-online-erorr' )
        console.log(err.stack)
    }) 
}

ServiceDiscover.prototype.subChannelMessage = function() {
    const self = this
    this.mcDelegate.on('message', function(channel, message) {
        if (channel === config.channel.service_discover) {
            self.getNewNode(message)
        }
    })
}

ServiceDiscover.prototype.pubChannelMessage = function() {
    const hostInfo = myStore.get().hostInfo
    this.mcDelegate.setHostInfo(config.channel.service_discover, hostInfo)
    this.pubChannelTimer = setInterval(this.mcDelegate.pubChannel, config.channel.cycle_time)
}

/*
* 本机也算是发现新node
*/ 
ServiceDiscover.prototype.getNewNode = function(data) {
    console.log('service-discover-->: get new node, config: %s', JSON.stringify(data))
    myEventer.emit(config.events.service_discover.new_node_online, info)
}

ServiceDiscover.prototype.bindEvents = function() {
    myDispatch.bind(config.events.service_discover.new_node_online,
        this.getNewNode)
}

ServiceDiscover.prototype.getSelfServerInfo = function() {
    const info = {}
    info.host_id = uuid()
    info.intranet_ip =  '1.1.1.1'
    myEventer.emit(config.events.service_discover.get_server_info, info)
    myEventer.emit(config.events.service_discover.new_node_online, info)
}