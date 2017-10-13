const config = {
    events: {
        service_discover: {
            new_node_online: 'NEW_NODE_ONLINE',
        }
    },
    server: {
        state: {
            offline: -99,
            online: 100,
        }
    }
}

exports = module.exports = config