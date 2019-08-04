const http = require('http');
const port = process.env.port || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
}).listen(port, () => console.log(`App listening on port ​${port}​!`));