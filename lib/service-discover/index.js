const Dispatch = require('../dispatch')
const myDispatch = new Dispatch()

function ServiceDiscover(opts) {
    this.opts = opts
    this.bindEvents()
    return this.create(opts)
}

ServiceDiscover.prototype.getNewNode = function(data) {
    
}

ServiceDiscover.prototype.bindEvents = function() {
    myDispatch.bind('service-discover_get-new-node', this.getNewNode)
}

exports=module.exports = ServiceDiscover;