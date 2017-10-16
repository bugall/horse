const ServiceDiscover = require('./lib/service-discover');

function Hourse(opts) {
    this.opts = opts;
}
Hourse.prototype.start = function() {
    // connection to message center
    new ServiceDiscover(this.opts.mc)
}

exports = module.exports = Hourse