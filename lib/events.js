const events = require('events')

function Eventer() {
    return this.create()
}

Eventer.prototype.create = function() {
    return new events()
}

exports = module.exports = Eventer