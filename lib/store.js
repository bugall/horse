const _ = require('lodash')
const myDispatch = require('./dispatch')
const config = require('./config')

function Store() {
    this.config = {
        serverStateCode: [ 100, -99 ]
    }
    this.clusterStateInfo = {
        nodesInfo: [] // [{ host_id: 'uuid.v4', host_ip: '10.1.1.1', state: 100, isMaster: true }]
    }
    this.hostInfo = {}
    this.bind()
}

// data = { server_id: 'uuid.v4', server_ip: '10.1.1.1' }
Store.prototype.addNewNode = function(data) {
    let err = null, answer = true
    // Check to see if it already exists
    const serverInfo = this.getServerInfo(data.host_id)
    if (!_.isEmpty(serverInfo)) {
        err = 'host not exist'
    } else {
        this.clusterStateInfo.nodesInfo.push(data)
    }
}
// data = { server_id: 'uuid.v4', state = [-99, 100]}
Store.prototype.updateNodeState = function(data) {
    let err = null, answer = true
    const serverInfo = this.getServerInfo(data.host_id)
    if (!_.includes(this.config.serverStateCode, Number(data.state)) || _.isEmpty(hostInfo)) {
        err = 'host info and state not legal'
    } else {
        serverInfo.state = data.state
    }
}

Store.prototype.getServerInfo = function(hostId) {
    const serverInfo = _.find(this.clusterStateInfo.nodesInfo, { host_id: hostId})
    return serverInfo
}

Store.prototype.saveHostInfo = function(data) {
    this.hostInfo = data
}

Store.prototype.bind = function() {
    const self = this
    myDispatch.bind(config.events.serviceDiscover.newNodeOnline, {
        callback: self.addNewNode.bind(self),
        level: 0,
    })
    myDispatch.bind(config.events.serviceDiscover.getServerInfo, {
        callback: self.saveHostInfo.bind(self),
        level: 0
    })
}
const myStore = new Store()

exports = module.exports = {
    get: function() {
        return {
            clusterStateInfo:  _.defaultsDeep({}, myStore.clusterStateInfo),
            hostInfo: _.defaultsDeep({}, myStore.hostInfo),
        }
    }
}