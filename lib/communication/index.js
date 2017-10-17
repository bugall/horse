const myStore = require('../store')
const myDispatch = require('../dispatch')
const config = require('../config')
const _ = require('lodash')

function Communication() {
    this.connectionInfo = {}
}

Communication.prototype.startClient = function(serverInfo) {
    if (_.isEmpty(this.connectionInfo[serverInfo.host_id])) {
        this.connectionInfo[serverInfo.host_id] = {}
    }
    if (_.isEmpty(this.connectionInfo[serverInfo.host_id].server)) {
        this.connectionInfo[serverInfo.host_id] = {}
    }
    this.connectionInfo[host_id] = {
}

Communication.prototype.startServer = function(serverInfo) {
    if (_.isEmpty(this.connectionInfo[serverInfo.host_id])) {
        this.connectionInfo[serverInfo.host_id] = {}
    }
    if (_.isEmpty(this.connectionInfo[serverInfo.host_id].client)) {
        this.connectionInfo[serverInfo.host_id] = {}
    }
}

Communication.prototype.removeConnection = function(serverInfo) {

}

Communication.prototype.bind = function() {
    const self = this
    myDispatch.bind(config.events.serviceDiscover.newNodeOnline, {
        callback: self.startClient.bind(self),
        level: 1
    })
    myDispatch.bind(config.events.serviceDiscover.newNodeOnline, {
        callback: self.startServer.bind(self),
        level: 2
    })
    myDispatch.bind(config.events.serviceDiscover.nodeOffline, self.removeConnection.bind(self))
}