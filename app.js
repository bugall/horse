const hourse = require('./index')

const myHouse = new hourse({
    mc: {
        type: 'redis',
        config: {
            port: 6379,
            host: 'dev-redis',
        }
    }
})
myHouse.start()

