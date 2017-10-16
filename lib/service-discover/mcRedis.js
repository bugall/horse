const redis = require('ioredis')
const Promise = require('bluebird')

function McRedis(opts) {
    this.opts = opts
}

McRedis.prototype.start = function() {
    const self = this
    this.redis = new Redis(opts)
    const config = {}
    return new Promise(function (resolve, reject) {
        this.redis.on('connect', function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(self.redis)
            }
        })
        this.redis.on('error', function(err, result) {
            reject(err)
        })
    })
}
// TODO
McRedis.prototype.pubChannel = function(channel, data) {
    return this.redis.publish(channel, data)
}
McRedis.prototype.subChannel = function(channel, callback) {
    this.redis.subscribe(cahnnel, callback)
}
McRedis.prototype.setHostInfo = function(channle, data) {
    this.config.channel = channle;
    this.config.message = data
}

exports = module.exports = McRedis