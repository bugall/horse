const config = {
    events: {
        serviceDiscover: {
            newNodeOnline: 'NEW_NODE_ONLINE',
            getServerInfo: 'GET_SERVER_INFO',
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
}

exports = module.exports = config