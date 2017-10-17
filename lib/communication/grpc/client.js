const grpc = require('grcp')
const communicationGrpc = grpc.load('./.proto').communication
const gConfig = require('../config').grpc
const uuid = require('uuid/v4')

function GrpcClient(opts) {
    this.config = opts
    this.client = null
}

GrpcClient.prototype.create = function(gConfig) {
    this.client = new communicationGrpc.Work(gConfig, grpc.credentials.createInsecure())
}

GrpcClient.prototype.sendWorkUnitInfo = function(info, callback) {
    this.client.workUnitInfo(info, callback)
}

GrpcClient.prototype.getWorkUnitInfo = function(info, callback) {

}
exports = module.exports = new GrpcClient

function main() {
    var client = new hello_proto.Greeter('localhost:50051',
        grpc.credentials.createInsecure());
    client.sayHello({ name: 'you' }, function (err, response) {
        console.log('Greeting:', response.message);
    });
    client.sayHelloAgain({ name: 'you' }, function (err, response) {
        console.log('Greeting:', response.message);
    });
  }