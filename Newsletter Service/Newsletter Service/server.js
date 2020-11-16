let http = require("http");
let url = require("url");
let fs = require("fs");
let port = 9000;
let path = require("path");

let server = http.createServer(function(req, res) {
  res.writeHead(200, {"Access-Control-Allow-Origin": "*"});
  let urlParts = url.parse(req.url, true);

  let permittedFiles = /(.html|.js|.css)/gi;

  if (urlParts.path.search(permittedFiles) !== -1) {
    fs.readFile(__dirname + urlParts.path, function(err, file) {
        if (urlParts.path.indexOf(".html")) {
            res.writeHead(200, { "Content-Type": "text/html" });
        } else if (urlParts.path.indexOf(".html")) {
            res.writeHead(200, { "Content-Type": "text/javascript" });
        } else {
            //res.writeHead(200, { "Content-Type": "text/css" });
            //let fileContents = fs.readFileSync('../assets/css/main.css', { encoding: 'utf-8' });
            //res.write(fileContents);
        }
        

      res.end(file);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, function() {
  console.log("Server listening on " + port);
});
 