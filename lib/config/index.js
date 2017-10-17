const config = {
    events: {
        serviceDiscover: {
            newNodeOnline: 'NEW_NODE_ONLINE',
            getServerInfo: 'GET_SERVER_INFO',
        },
        communication: {
            getRpcMessage: 'GET_RPC_MESSAGE',
        }
    },
    server: {
        state: {
            offline: -99,
            online: 100,
        }
    },
    channel: {
        serviceDiscover: 'service-discover',
        cycleTime: 1000
    },
    rpc: {
        host: '0.0.0.0',
        port: 8088
    }
}

exports = module.exports = config