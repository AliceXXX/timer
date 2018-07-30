var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    query = require("querystring");

var mime = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "imagejpeg",
    ".gif": "image/gif",
    ".txt": "text/plain"
};
var json_date = JSON.parse(fs.readFileSync('./1.json', 'utf-8'));

var server = http.createServer(function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            var s = JSON.parse(body);
            json_date.push(s[0]);
            fs.writeFile('./1.json', JSON.stringify(json_date,null,' '), function (err) {
                if (err) {
                    throw err;
                }
            });
            console.log(json_date);
            res.end();
        });
    }else{
        if (req.url == '/') {
            var filePath = '/html/main.html';
        } else {
            var filePath = req.url;
        }
        var fullPath = __dirname + filePath;

        fs.readFile(fullPath, "utf-8", function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('not found!!');
                return res.end();
            }
            res.writeHead(200, { 'Contetnt-Type': mime[path.extname(fullPath)] || "text/plain" });
            res.write(data);
            return res.end();
        });
    }
});

server.listen(8080, 'localhost');
console.log('server listening, port 8080');
