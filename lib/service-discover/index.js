const Eventer = require('../events')
const myDispatch = require('../dispatch')
const config = require('../config')
const myStore = require('../store')
const uuid = require('uuid/v4')
const os = require('os')
const moment = require('moment')

const myEventer = new Eventer()

function ServiceDiscover(opts) {
    this.opts = opts
    this.mcDelegate
    this.create()
}

ServiceDiscover.prototype.create = function() {
    switch (this.opts.type) {
        case 'redis':
            const Redis = require('./mcRedis')
            this.mcDelegate = new Redis(this.opts.config)
            break;
        default:
            break;
    }
    const self = this
    let pubChannelTimer = null
    this.bindEvents()
    this.getSelfServerInfo()
    this.startServiceDiscover()
}
ServiceDiscover.prototype.startServiceDiscover = function() {
    const self = this
    this.mcDelegate.start().then(function(connector) {
        console.log('service-discover-->: service-online and sub channel: %s', config.channel.serviceDiscover )
        self.mcDelegate.subChannel(config.channel.serviceDiscover, self.subChannelMessage.bind(self))
        self.tellOtherIamOnline()
    }).catch(function(err) {
        console.log('service-discover-->: service-online-erorr' )
        console.log(err.stack)
    }) 
}

ServiceDiscover.prototype.subChannelMessage = function (channel, message) {
    if (channel === config.channel.serviceDiscover) {
        const data = JSON.parse(message)
        const hostInfo = myStore.get().hostInfo
        // 自己发的消息自己不处理
        if (data.host_id !== hostInfo.host_id) {
            this.getNewNode(data)
        }
    }
}

ServiceDiscover.prototype.tellOtherIamOnline = function() {
    const hostInfo = myStore.get().hostInfo
    this.pubChannelTimer = setInterval(tmp, config.channel.cycleTime)
    const self = this

    function tmp() {
        self.mcDelegate.pubChannel(config.channel.serviceDiscover, JSON.stringify(hostInfo))
    }
}
/*
* 本机也算是发现新node
*/ 
ServiceDiscover.prototype.getNewNode = function(data) {
    myDispatch.routeMessage(config.events.serviceDiscover.newNodeOnline, data)
}

ServiceDiscover.prototype.bindEvents = function() {
}

ServiceDiscover.prototype.getSelfServerInfo = function() {
    const info = {}
    info.host_id = uuid()
    info.intranet_ip =  '1.1.1.1'
    info.create_time = moment().valueOf()
    myDispatch.routeMessage(config.events.serviceDiscover.getServerInfo, info)
}

exports = module.exports = ServiceDiscover