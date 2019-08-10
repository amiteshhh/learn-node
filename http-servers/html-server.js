const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    whiskers = require('whiskers'),
    through2 = require('through2'),
    url = require('url');

const port = process.env.port || 8080;

http.createServer((req, res) => {
    const reqUrl = new URL(req.url, 'http://dummy.url.com');//req.protocol+"://"+req.headers.host
    const sendSync = reqUrl.searchParams.get('sync') === 'true';
    if (sendSync) {
        console.log('Sending synced response');
        sendSyncResponse(res);
    } else {
        console.log('Sending streamed response');
        sendStreamResponse(res);
    }

}).listen(port, () => console.log(`App listening on port ​${port}​!`));

function sendSyncResponse(res) {
    const indexHtmlPpath = path.join(__dirname, 'index.html');
    const template = fs.readFileSync(indexHtmlPpath);
    const compiledTemplate = whiskers.render(template, { message: 'This is dynamic message from view engine whiskers', fileProcessingMode: 'synchronous' });
    const headers = { 'Content-Type': 'text/html' };
    res.write(compiledTemplate);
    res.writeHead(200, headers);
    res.end();
}

function sendStreamResponse(res) {
    const indexHtmlPpath = path.join(__dirname, 'index.html');
    const templateStream = fs.createReadStream(indexHtmlPpath);
    const compiledTemplateStream = getCompiledTemplateStream();
    templateStream.pipe(compiledTemplateStream).pipe(res);

    templateStream.on('error', function (err) {
        res.end(err);
    });
    const headers = { 'Content-Type': 'text/html' };
    res.writeHead(200, headers);
}

function getCompiledTemplateStream() {
    return through2(function (chunk, enc, next) {
        const template = chunk.toString();
        const compiledTemplate = whiskers.render(template, { message: 'This is dynamic message from view engine whiskers', fileProcessingMode: 'stream' });
        this.push(compiledTemplate)
        next();
    }, function (done) {
        done();
    });
}
