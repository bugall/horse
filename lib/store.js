const _ = require('moment')
const Dispatch = require('./dispatch')
const config = require('./config')
const myDispatch = new Dispatch()


function Store() {
    this.config = {
        hostStateCode: [ 100, -99 ]
    }
    this.clusterStateInfo = {
        nodesInfo: [] // [{ host_id: 'uuid.v4', host_ip: '10.1.1.1', state: 100 }]
    }
    this.serverInfo = {}
    this.bind()
}

// data = { host_id: 'uuid.v4', host_ip: '10.1.1.1' }
Store.prototype.addNewNode = function(data) {
    let err = null, answer = true
    // Check to see if it already exists
    const hostInfo = this.getHostInfo(data.host_id)
    if (_.isEmpty(hostInfo)) {
        err = 'host not exist'
    } else {
        this.clusterStateInfo.nodesInfo.push(data)
    }
    return err, answer
}
// data = { host_id: 'uuid.v4', state = [-99, 100]}
Store.prototype.updateNodeState = function(data) {
    let err = null, answer = true
    const hostInfo = this.getHostInfo(data.host_id)
    if (!_.includes(this.config.hostStateCode, Number(data.state)) || _.isEmpty(hostInfo)) {
        err = 'host info and state not legal'
    } else {
        hostInfo.state = data.state
    }
    return err, answer
}
Store.prototype.getHostInfo = function(host_id) {
    const hostInfo = _.find(this.clusterStateInfo.nodesInfo, { host_id: data.host_id })
    return hostInfo
}
Store.prototype.getSelfInfo = function(data) {
    this.serverInfo = data
}

Store.prototype.bind = function() {
    myDispatch.bind(config.events.service_discover.new_node_online, this.addNewNode)
}
