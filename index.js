const fs = require('fs');
const yaml = require('js-yaml');
const color = require('colors')

setup();

function setup() {
    if(!fs.existsSync("\data")) {
        try {
            fs.mkdirSync("\data");
            fs.appendFile('default.yml', '', function (err) {
                if (err) throw err;
                console.log('Default file was created!');
            });
            console.log("Folder for users data was created successfully!".green);
        } catch(e) {
            console.log("Error occurred when creating users data folder!".red)
        }
    }
}

function createDefaultFile(user, path) {
    if(!path){
        var path = '/data'
    }
    try {
        fs.copyFileSync('default.yml', path + '/' + user + '.yml');
    } catch(e) {
        //console.log("Error occurred when creating new yml file!".red);
        return 1;
    }
}

function setData(user, data, value, path) {
    if(!path){
        var path = '\data'
    }
    if(!fs.existsSync(path + '\\' + user + ".yml")) {
        createDefaultFile(user, path);
    }

    try {
        var document = yaml.safeLoad(fs.readFileSync(path + '\\' + user + '.yml', 'utf8'));
        document[data] = value;
        fs.writeFileSync(path + '\\' + user + '.yml', yaml.safeDump(document));
        docuemnt = null;
    } catch(e) {
        console.log(e);
    }
}

function getData(user, data, path) {
    if(!path){
        var path = '/data'
    }
    if(!fs.existsSync(path + '/' + user + ".yml")) {
        if(createDefaultFile(user) == 1) return;
    }

    try {
        var document = yaml.safeLoad(fs.readFileSync(path + '/' + user + '.yml', 'utf8'));
        return document[data];
    } catch(e) {
        console.log(e);
    }
}

module.exports = {setup, createDefaultFile, setData, getData}