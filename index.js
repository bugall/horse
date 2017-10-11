const MessageDispatch = require('./lib/message-dispatch');
const serviceDiscover = require('./lib/serviceDiscover');

function Hourse(opts) {
    this.opts = opts;
}
Hourse.prototype.create = function() {
    // connection to message center
    serviceDiscover(this.opts.mc)
}