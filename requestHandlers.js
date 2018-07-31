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

function existsFile(filename, callback) {
    fs.access(filename, "r", function (err, fd) {
        callback(!err || err.code !== "ENOENT");
    });
}
var json_date = [];

existsFile("./json/1.json", function (result) {
    if (result) {
      json_date = JSON.parse(fs.readFileSync('./json/1.json', 'utf-8'));
    } else {
        console.log("ファイルが存在しない");
    }
});

function start(res, postData) {
  console.log("> Request handler 'start' was called.");
  console.log("> start(postData) : "+postData);
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

function update(res, postData) {
  console.log("> Request handler 'update' was called.");
  var s = JSON.parse(postData);
  json_date.push(s[0]);
  fs.writeFile("./json/1.json", JSON.stringify(json_date,null,' '), function (err) {
      if (err) {
          throw err;
      }
  });
  console.log(s);
  return res.end();
}

function readstyle(res, pathname) {
  console.log("> Request handler 'readstyle' was called.");
  var fullPath = __dirname + pathname;
  fs.readFile(fullPath, "utf-8", function (err, data) {
      if (err) {
          console.log(">> No request handler found for " + pathname);
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
exports.update = update;
exports.readstyle = readstyle;
