var query = require("querystring"),
    path = require("path"),
    fs = require("fs");

var mime = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "imagejpeg",
    ".gif": "image/gif",
    ".txt": "text/plain"
};

function start(res, postData) {
  console.log("Request handler 'start' was called.");
  console.log("start(postData) : "+postData);
  var pathname = '/html/main.html';
  var fullPath = __dirname + pathname;
  fs.readFile(fullPath, "utf-8", function (err, data) {
      if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('not found!!');
          return res.end();
      }
      res.writeHead(200, { 'Contetnt-Type': mime[path.extname(fullPath)] || "text/plain" });
      res.write(data);
      res.end();
  });
}

function upload(res, postData) {
  console.log("Request handler 'upload' was called.");
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("You've sent the text: "+
  query.parse(postData).text);
  res.end();
}

function readstyle(res, pathname) {
  console.log("Request handler 'readstyle' was called.");
  var fullPath = __dirname + pathname;
  fs.readFile(fullPath, "utf-8", function (err, data) {
      if (err) {
          console.log("No request handler found for " + pathname);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('not found!!');
          return res.end();
      }
      res.writeHead(200, { 'Contetnt-Type': mime[path.extname(fullPath)] || "text/plain" });
      res.write(data);
      res.end();
  });
}

exports.start = start;
exports.upload = upload;
exports.readstyle = readstyle;
