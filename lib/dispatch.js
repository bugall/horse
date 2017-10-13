const _ = require('lodash')

function Dispatch() {
    this.eventsBindingInfo = {}
}

Dispatch.prototype.bind = function (event, opts) {
    const eventsInfo = this.eventsBindingInfo

    if (_.isEmpty(eventsInfo.events)) {
        eventsInfo.events = []
    }
    // callbacks are in order, 0 -> 100
    // 0 express height callback level
    eventsInfo.events.push({
        level: opts.level,
        callback: opts.callback
    })
    // sort events callback function by level segment
    eventsInfo = _.sortBy(eventsInfo.events, 'level')
}

Dispatch.prototype.remove = function(event, callback) {
    const callbacks = this.eventsBindingInfo.event
    _.forEach(callbacks, function(index, item) {
        if (callback === item) {
            callbacks.splice(index + 1, 1)
        }
    })
    return true
}

Dispatch.prototype.routeMessage = function(event, data) {
    const callbacks = this.eventsBindingInfo.event
    _.forEach(callbacks, function(callback) {
        callback(data)
    })
}

exports = module.exports = Dispatch