const config = {
    events: {
        service_discover: {
            new_node_online: 'NEW_NODE_ONLINE',
            get_server_info: 'GET_SERVER_INFO',
        }
    },
    server: {
        state: {
            offline: -99,
            online: 100,
        }
    },
    channel: {
        service_discover: 'service-discover',
        cycle_time: 1000
    }
}

exports = module.exports = config