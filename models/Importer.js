import { DirWatcher } from './DirWatcher';
const fs = require('fs'), csv = require('csvtojson'), path = require('path');

export class Importer {
    constructor() {
        console.log('Importer module');
        this.folderJsonContents = {}

        var dirWatcher = new DirWatcher();
        var watchDir = './models/data', delay_ms = 2000;
        dirWatcher.watch(watchDir, delay_ms);
        dirWatcher.on('dirwatcher:changed', async (fileName) => {
            if (this.folderJsonContents[fileName]) {
                console.log('Already read. Skipping the file', fileName);
                return;
            }
            // Async / await usage
            let csvFilePath = path.join(watchDir, fileName);//watchDir + '/' + fileName
            const json = await csv().fromFile(csvFilePath);
            this.folderJsonContents[fileName] = json;
            console.log(json);
        });
    }

    import(directory) {
        return csv()
            .fromFile(directory)
            .then((jsonObj) => {
                console.log(jsonObj);
            });
    }

    importSync(directory) {
        var folderJsonContents = {};
        fs.readdir(directory, function (err, fileNames) {
            if (err) {
                onError(err);
                return;
            }
            fileNames.forEach(fileName => {
                let csvRawData = fs.readFileSync(path.join(directory, fileName));
                folderJsonContents[fileName] = csvRawData;
                // csv().fromString(csvRawData);
            });
        });
        return folderJsonContents;
    }
}