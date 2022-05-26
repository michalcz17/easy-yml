const color = require('colors');
const fs = require('fs');
const yaml = require('js-yaml');

setup();

function setup() {
    if(!fs.existsSync("\data")) {
        try {
            fs.mkdirSync("\data");
            
            console.log("Folder for users data was created successfully!".green);
        } catch(e) {
            console.log("Error occurred when creating users data folder!".red)
        }
    }
    if(!fs.existsSync("./node_modules/easy-yml/default.yml")){
        fs.appendFile('./node_modules/easy-yml/default.yml', 'file: true', function (err) {
            if (err) throw err;
            console.log('Default file was created!'.green);
        });
    }
}

function createDefaultFile(user) {
    try {
        fs.copyFileSync('./node_modules/easy-yml/default.yml', 'data/' + user + '.yml');
    } catch(e) {
        console.log("Error occurred when creating new yaml file! (default.yml couldn't be find)".red);
        return 1;
    }
}

function setData(user, path, value) {
    if(!fs.existsSync("data/" + user + ".yml")) {
        createDefaultFile(user);
    }

    try {
        var document = yaml.safeLoad(fs.readFileSync('data/' + user + '.yml', 'utf8'));
        document[path] = value;
        fs.writeFileSync('data/' + user + '.yml', yaml.safeDump(document));
        docuemnt = null;
    } catch(e) {
        console.log(e);
    }
}

function getData(user, path) {
    if(!fs.existsSync("data/" + user + ".yml")) {
        if(createDefaultFile(user) == 1) return;
    }

    try {
        var document = yaml.safeLoad(fs.readFileSync('data/' + user + '.yml', 'utf8'));
        return document[path];
    } catch(e) {
        console.log(e);
    }
}

module.exports = {setup, createDefaultFile, setData, getData}
