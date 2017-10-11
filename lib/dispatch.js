const Eventer = require('./eventer')
const _ = require('lodash')

function Dispatch() {
    this.eventsBindingInfo = {}
}

Dispatch.prototype.bind = function(event, callback) {
   if (_.isEmpty(this.eventsBindingInfo.events)) {
       this.eventsBindingInfo.events = []
   }
   this.eventsBindingInfo.events.push(callback)
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