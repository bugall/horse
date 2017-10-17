const grpc = require('grpc')
const communicationGrpc = grpc.load(__dirname + '/communication.proto').communication
const gConfig = require('../../config').rpc
const uuid = require('uuid/v4')

function GrpcClient(opts) {
    this.config = opts
}

GrpcClient.prototype.createClient = function(gConfig) {
    return new communicationGrpc.Work(gConfig, grpc.credentials.createInsecure())
}

GrpcClient.prototype.startServer = function(proxyConfig) {
    const server = new grpc.Server()
    server.addProtoService(communicationGrpc.Work.service, proxyConfig)
    server.bind(gConfig.host + ':' + gConfig.port, grpc.ServerCredentials.createInsecure())
    server.start()
}

exports = module.exports = new GrpcClient()