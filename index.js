//const Communication = require('./lib/communication')
//const myCommunication = new Communication()
const ServiceDiscover = require('./lib/service-discover');

function Hourse(opts) {
    this.opts = opts;
}
Hourse.prototype.start = function() {
    // connection to message center
    new ServiceDiscover(this.opts.mc)
    //myCommunication.start()
}

const myStore = require('./lib/store')

setInterval(test, 5000)

function test() {
    console.log(myStore.get().clusterStateInfo)
}
exports = module.exports = Hourse
