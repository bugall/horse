const Promise = require('bluebird')
const myStore = require('../store')
const myDispatch = require('../dispatch')
const config = require('../config')
const rpc = require('./grpc')
const _ = require('lodash')

function Communication() {
    this.connector= {}
}

Communication.prototype.start = function() {
    const self = this
    // start server
    rpc.startServer({
        WorkUnit: self.receiveServerMessage.bind(self),
    })
}

Communication.prototype.startClient = function(serverInfo) {
    const self = this
    if (_.isEmpty(this.connector[serverInfo.hostId])) {
        this.connector[serverInfo.hostId] = {}
    }
    this.connector[hostId] = {
        client:  rpc.createClient(serverInfo.intranet_ip + ':' + serverInfo.port),
        createTime: serverInfo.createTime
    }
}

Communication.prototype.removeConnector = function(serverInfo) {
    delete this.connector[serverInfo.hostId]
}

Communication.prototype.receiveServerMessage = function(message) {
    console.log('communication-receive-message-->: ', message)
    myDispatch.routeMessage(config.events.communication.getRpcMessage, info)
}

Communication.prototype.sendWorkUnitInfo = function(hostId, info) {
    const self = this
    return new Promise(function(resolve, reject) {
        self.connector[hostId].sendWorkUnitInfo(info, function(err, result){
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
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