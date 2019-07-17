var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
var helpNote = ''
if (argv.help || argv.h) {
    console.log(helpNote)
    return;
}
var action = argv.action || argv.a;
var data = argv._[0];
switch (action) {
    case 'reverse': return reverse(data)
    case 'transform': return transform(data)
    case 'outputFile': return outputFile(data)
    case 'convertFromFile': return convertFromFile(data)
    case 'convertToFile': return convertToFile(data)
}

function reverse(str) {
    console.log('Enter text to reverse');
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
        let chunk;
        // Use a loop to make sure we read all available data.
        while ((chunk = process.stdin.read()) !== null) {
            process.stdout.write(`reverse: ${chunk.split('').reverse().join('')}`);
        }
    });
    process.stdin.on('end', () => {
        process.stdout.write('end');
      });
}
function transform(str) { }
function outputFile(filePath) { }
function convertFromFile(filePath) { }
function convertToFile(filePath) { }