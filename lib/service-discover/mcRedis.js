const Redis = require('ioredis')
const Promise = require('bluebird')

function McRedis(opts) {
    this.opts = opts
}

McRedis.prototype.start = function() {
    const self = this
    this.redis = new Redis(this.opts)
    const config = {}
    return new Promise(function (resolve, reject) {
        self.redis.on('connect', function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(self.redis)
            }
        })
        self.redis.on('error', function(err, result) {
            reject(err)
        })
    })
}
// TODO
McRedis.prototype.pubChannel = function(channel, data) {
    return this.redis.publish(channel, data)
}
McRedis.prototype.subChannel = function(channel, callback) {
    this.redis.subscribe(channel, callback)
}
McRedis.prototype.setHostInfo = function(channel, data) {
    this.config.channel = channel;
    this.config.message = data
}

exports = module.exports = McRedis