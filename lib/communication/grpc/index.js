const grpc = require('grcp')
const communicationGrpc = grpc.load('./.proto').communication
const gConfig = require('../../config').grpc
const uuid = require('uuid/v4')

function GrpcClient(opts) {
    this.config = opts
}

GrpcClient.prototype.createClient = function(gConfig, callback) {
    callback(new communicationGrpc.Work(gConfig, grpc.credentials.createInsecure()))
}
GrpcClient.prototype.startServer = function(proxyConfig) {
    const server = new grpc.Server()
    server.addProtoService(communicationGrpc.Work, proxyConfig)
    server.bind(gConfig.host + ':' + gConfig.port, grpc.ServerCredentials.createInsecure())
    server.start()
}

GrpcClient.prototype.sendWorkUnitInfo = function(info, callback) {
    this.client.workUnitInfo(info, callback)
}

GrpcClient.prototype.getWorkUnitInfo = function(info, callback) {
}

exports = module.exports = new GrpcClient