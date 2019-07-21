var argv = require('minimist')(process.argv.slice(2));
const fs = require('fs'),
    csv = require('csvtojson'),
    through2 = require('through2');

/* commands
    node utils/Streams --help -a=transform
    node utils/Streams -a=reverse
    node utils/Streams -a=transform
    node utils/Streams -a=outputFile -f=models/data/users.csv
    node utils/Streams -a=outputFile --file utils/Streams.js
    node utils/Streams -a=convertFromFile --file models/data/users.csv
    node utils/Streams -a=convertToFile --file models/data/users.csv
*/

console.dir(argv);
var helpNote = 'This is sample help note for you';
var helpKey = argv.help ? 'help' : (argv.h ? 'h' : '');
if (helpKey && indexOfKey(argv, helpKey) === 1) {
    console.log(helpNote)
    return;
}
var action = argv.action || argv.a;
var filename = argv.file || argv.f;
switch (action) {
    case 'reverse': return reverse(data)
    case 'transform': return transform()
    case 'outputFile': return outputFile(filename)
    case 'convertFromFile': return convertFromFile(filename)
    case 'convertToFile': return convertToFile(filename)
    default: console.error('Invalid action ' + action)
}

function write(buffer, encoding, next) {
    this.push('I got some data: ' + buffer + '\n');
    next();
}
function end(done) { done(); }
stream.on('data', function (data) {
    var toString = Object.prototype.toString.call(data)
    console.log('type of data:', toString)
    console.log('data:', data, '\n')
})

function indexOfKey(obj, key) {
    var keys = Object.keys(obj);
    return keys.indexOf(key);
}

function reverse(str) {
    console.log('Enter text to reverse');
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
        let chunk;
        // Use a loop to make sure we read all available data.
        while ((chunk = process.stdin.read()) !== null) {
            process.stdout.write(`reverse: ${chunk.split('').reverse().join('')}\n`);
        }
    });
    process.stdin.on('end', () => {
        process.stdout.write('end');
    });
}
function transform() {
    var stream = through2(function (buffer, enc, next) {//{ objectMode: true }, 
        var string = buffer.toString()
        var result = string.toUpperCase();
        this.push(result)
        next()
    }, function (done) {
        done();
    });

    process.stdin
        .pipe(stream)
        .pipe(process.stdout);
}
function outputFile(filename) {
    if (!filename) {
        console.error('No file name provided. Are you missing --file or -f argument');
        return;
    }

    // This line opens the file as a readable stream
    var readStream = fs.createReadStream(filename);

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(process.stdout);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function (err) {
        console.error(err);
    });
}
async function convertFromFile(filename) {
    if (!filename) {
        console.error('No file name provided. Are you missing --file or -f argument');
        return;
    }
    // This line opens the file as a readable stream
    var readStream = fs.createReadStream(filename);
    readStream.pipe(csv()).pipe(process.stdout);
     // This catches any errors that happen while creating the readable stream (usually invalid names)
     readStream.on('error', function (err) {
        console.error(err);
    });
}
function convertToFile(filename) {
    if (!filename) {
        console.error('No file name provided. Are you missing --file or -f argument');
        return;
    }
    // This line opens the file as a readable stream
    var readStream = fs.createReadStream(filename);
    var jsonFileName = filename.replace('.csv', '.json');
    var writeStream = fs.createWriteStream(jsonFileName);
    readStream.pipe(csv()).pipe(writeStream);
     // This catches any errors that happen while creating the readable stream (usually invalid names)
     readStream.on('error', function (err) {
        console.error('Error reaing file', err);
        writeStream.end();
    });

    writeStream.on('open', function () {
        console.log('Creating json file ' + jsonFileName)
      }).on('error', function (err) {
        console.error(err);
      }).on('finish', function () {
        console.log('Successfully created json file ' + jsonFileName);
      });
}