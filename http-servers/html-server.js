const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    whiskers = require('whiskers'),
    through2 = require('through2');

const port = process.env.port || 8080;

http.createServer((req, res) => {
    if (req.url.includes('?')) {
        console.log('Sending synced response');
        sendSyncResponse(res);
    } else {
        console.log('Sending streamed response');
        sendStreamResponse(res);
    }

}).listen(port, () => console.log(`App listening on port ​${port}​!`));

function sendSyncResponse(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let indexHtmlPpath = path.join(__dirname, 'index.html');
    let template = fs.readFileSync(indexHtmlPpath);
    let compiledTemplate = whiskers.render(template, { message: 'This is dynamic message from view engine whiskers', fileProcessingMode: 'synchronous' });
    res.write(compiledTemplate);
    res.end();
}

function sendStreamResponse(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let indexHtmlPpath = path.join(__dirname, 'index.html');
    let templateStream = fs.createReadStream(indexHtmlPpath);
    let compiledTemplateStream = getCompiledTemplateStream();
    templateStream.pipe(compiledTemplateStream).pipe(res);

    templateStream.on('error', function (err) {
        res.end(err);
    });
}

function getCompiledTemplateStream() {
    return through2(function (chunk, enc, next) {
        let template = chunk.toString();
        let compiledTemplate = whiskers.render(template, { message: 'This is dynamic message from view engine whiskers', fileProcessingMode: 'stream' });
        this.push(compiledTemplate)
        next();
    }, function (done) {
        done();
    });
}
