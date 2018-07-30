var http = require("http");
var url = require("url");
var util = require('util');



function start(route, handle) {
  function onRequest(req, res) {
    var postData = "";
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
//    console.log("req:"+util.inspect(req));
    console.log("> req.url : " + req.url);
    console.log("> req.method : " + req.method);

    req.setEncoding("utf-8");

    req.on("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("> Received POST data chunk '"+
      postDataChunk + "'.");
    });

    req.on("end", function() {
      route(handle, pathname, res, postData);
    });

  }

  http.createServer(onRequest).listen(8080);
  console.log("Server has started.");
}

exports.start = start;
