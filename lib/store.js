const _ = require('moment')
const Dispatch = require('./dispatch')
const config = require('./config')
const myDispatch = new Dispatch()

function Store() {
    this.config = {
        serverStateCode: [ 100, -99 ]
    }
    this.clusterStateInfo = {
        nodesInfo: [] // [{ host_id: 'uuid.v4', host_ip: '10.1.1.1', state: 100 }]
    }
    this.hostInfo = {}
    this.bind()
}

// data = { server_id: 'uuid.v4', server_ip: '10.1.1.1' }
Store.prototype.addNewNode = function(data) {
    let err = null, answer = true
    // Check to see if it already exists
    const serverInfo = this.getServerInfo(data.server_id)
    if (_.isEmpty(serverInfo)) {
        err = 'host not exist'
    } else {
        this.clusterStateInfo.nodesInfo.push(data)
    }
    return err, answer
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
    return err, answer
}

Store.prototype.getServerInfo = function(host_id) {
    const serverInfo = _.find(this.clusterStateInfo.nodesInfo, { host_id: data.server_id })
    return serverInfo
}

Store.prototype.saveHostInfo = function(data) {
    this.serverInfo = data
}

Store.prototype.bind = function() {
    myDispatch.bind(config.events.service_discover.new_node_online, this.addNewNode)
}
const myStore = new Store()

exports = module.exports = {
    get: function() {
        return {
            clusterStateInfo:  _.defaultDeep({}, myStore.clusterStateInfo),
            hostInfo: _.defaultDeep({}, myStore.hostInfo),
        }
    }
}