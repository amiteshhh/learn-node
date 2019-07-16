const fs = require('fs'),
    events = require('events');

export class DirWatcher extends events.EventEmitter {
    constructor() {
        super()
        console.log('DirWatcher module');
    }

    watch(watchDir, delay) {
        delay = delay || 1000;//default delay is 1 second
        console.log(`Will start watching directory ${watchDir} after ${delay} milliseconds`);
        setTimeout(() => {
            fs.watch(watchDir, (eventType, fileName) => {//firing twice
                console.log(eventType);
                this.emit("dirwatcher:changed", fileName);
            })
        }, delay);
    }
}
