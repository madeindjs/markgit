const fs = require('fs')
const path = require('path')


const mkdirSync = function (dirPath) {
    try {
        fs.mkdirSync(dirPath)
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
    

    fs.writeFile(dirPath + 'touch.log', "Hey there!", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}



mkdirSync('/tmp/test/')

require('simple-git')('/tmp/test/')
    .init()
    // TODO: Setup this in settings
    .addConfig('user.name', 'Some One')
    .addConfig('user.email', 'some@one.com')
    .add('./*')
    .commit("first commit!")
    // .addRemote('origin', 'https://github.com/user/repo.git')
    // .push('origin', 'master');