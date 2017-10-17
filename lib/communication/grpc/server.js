function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}

function sayHelloAgain(call, callback) {
    callback(null, { message: 'Hello again, ' + call.request.name });
}

function main() {
    var server = new grpc.Server();
    server.addProtoService(hello_proto.Greeter.service, { 
        sayHello: sayHello, sayHelloAgain: sayHelloAgain 
    });
    server.bind('0.0.0.0:8088', grpc.ServerCredentials.createInsecure());
    server.start();
}