var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/update"] = requestHandlers.update;
handle["/readstyle"] = requestHandlers.readstyle;

server.start(router.route, handle);
