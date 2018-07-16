const fs = require('fs')
const path = require('path')
const SimpleMDE = require('./node_modules/simplemde/dist/simplemde.min.js')


const AUTO_SAVE_TIME = 2000
const NOTE_PATH = '/tmp/test/'
const NOTE_FILE = NOTE_PATH + 'touch.log'


let oldValue = ''

// create editor
let simplemde = new SimpleMDE({
    element: document.getElementById("editor"),
});

// create repository
let repository = require('simple-git')(NOTE_PATH)
    .init()
    // TODO: Setup this in settings
    .addConfig('user.name', 'Some One')
    .addConfig('user.email', 'some@one.com')
    

// create the given directory
const mkdirSync = function () {
    try {
        fs.mkdirSync(NOTE_PATH)
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}


// write file & commit
function save(value) {
    fs.writeFile(NOTE_FILE, value, function(err) {
        if(err) {
            return alert(err)
        }

        repository.add('./*').commit("Automatic save")
        console.log('Commit created')

        oldValue = value
    });
}

// save the current mde opened & commit if necessary
function automaticSave() {
    setTimeout(() => {
        let newValue = simplemde.value()
        // skip this method if value not changed
        if (oldValue != newValue) {
            save(newValue)
        }
        return automaticSave()
    }, AUTO_SAVE_TIME);
}


// setup everything
function init() {
    // create folder if not exist
    mkdirSync(NOTE_PATH)

    // get value from file
    fs.readFile(NOTE_FILE, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        simplemde.value(data)
        // begin automatic save
        automaticSave()
    })
}


init()
