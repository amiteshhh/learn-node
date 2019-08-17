const http = require('http');
const port = process.env.port || 8080;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': req.headers["content-type"] || 'text/plain' });
    req.pipe(res);
}).listen(port, () => console.log(`App listening on port ​${port}​!`));