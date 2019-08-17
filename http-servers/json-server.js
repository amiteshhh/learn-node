const http = require('http');
const port = process.env.port || 8080;

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [{ color: 'blue' }, { size: 'XL' }]
};

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(product));
    res.end();
}).listen(port, () => console.log(`App listening on port ​${port}​!`));