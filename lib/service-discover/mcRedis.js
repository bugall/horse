const Redis = require('ioredis')
const Promise = require('bluebird')

function McRedis(opts) {
    this.opts = opts
    this.config = {}
}

McRedis.prototype.start = function() {
    const self = this
    this.redis = new Redis(this.opts)
    this.pubRedis = new Redis(this.opts)

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
    // console.log('service-discover-->: publish channel: %s, message: %s', channel,  JSON.stringify(data))
    this.pubRedis.publish(channel, data)
}

McRedis.prototype.subChannel = function(channel, callback) {
    this.redis.on('message', callback)
}

exports = module.exports = McRedis