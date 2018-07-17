const fs = require('fs')

module.exports = class Repository {

    constructor(path){
        this.path = path
        this.createDirectory()

        this.simpleGit = require('simple-git')(this.path)
            .init()
            // TODO: Setup this in settings
            .addConfig('user.name', 'Some One')
            .addConfig('user.email', 'some@one.com')
    }

    // write file & commit
    save(value) {

        let simpleGit = this.simpleGit

        fs.writeFile(NOTE_FILE, value, function(err) {
            if(err) {
                return alert(err)
            }

            simpleGit.add('./*').commit("Automatic save", () => {
                console.log('Commit created')
                oldValue = value
            })

        });
    }


    // create the given directory
    createDirectory() {
        try {
            fs.mkdirSync(this.path)
        } catch (err) {
            if (err.code !== 'EEXIST') throw err
        }
    }


}