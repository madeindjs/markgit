const fs = require('fs')
const path = require('path')
const SimpleMDE = require('./node_modules/simplemde/dist/simplemde.min.js')
const Repository = require('./src/repository.js')


const AUTO_SAVE_TIME = 2000
const NOTE_PATH = '/tmp/test/'
const NOTE_FILE = NOTE_PATH + 'touch.log'



let repo = new Repository('/tmp/test/')


let oldValue = ''

// create editor
let simplemde = new SimpleMDE({
    element: document.getElementById("editor"),
});

// save the current mde opened & commit if necessary
function automaticSave() {
    setTimeout(() => {
        let newValue = simplemde.value()
        // skip this method if value not changed
        if (oldValue != newValue) {
            repo.save(newValue)
        }
        return automaticSave()
    }, AUTO_SAVE_TIME);
}


// setup everything
function init() {
    // create file if not exists
    fs.closeSync(fs.openSync(NOTE_FILE, 'a'));
    // get value from file
    fs.readFile(NOTE_FILE, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        simplemde.value(data)
        // begin automatic save
        automaticSave()
    })
}


init()
