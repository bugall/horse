const _ = require('lodash')

function Dispatch() {
    this.eventsBindingInfo = {}
}

Dispatch.prototype.bind = function (event, opts) {
    if (_.isEmpty(this.eventsBindingInfo.events)) {
        this.eventsBindingInfo = { events: [] }
    }
    let params = {}
    if (_.isFunction(opts)) {
        params.level = 100 //default 1000
        params.callback = opts
    } else {
        params = opts
    }
    // callbacks are in order, 0 -> 100
    // 0 express height callback level
    this.eventsBindingInfo.events.push(params)
    // sort events callback function by level segment
    eventsInfo = _.sortBy(this.eventsBindingInfo.events, 'level')
}

Dispatch.prototype.remove = function(event, callback) {
    _.forEach(this.eventsBindingInfo.events, function(index, item) {
        if (callback === item) {
            callbacks.splice(index + 1, 1)
        }
    })
    return true
}

Dispatch.prototype.routeMessage = function(event, data) {
    // console.log('dispatch--> router message: event is -> %s, message is -> %s', event, JSON.stringify(data))
    _.forEach(this.eventsBindingInfo.events, function(item) {
        item.callback(data)
    })
}

exports = module.exports = new Dispatch()