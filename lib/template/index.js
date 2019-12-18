const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
//https://github.com/shelljs/shelljs
const shell = require('shelljs');

const {Info, Error, Warning, Success, CustomColor} = require('../Global/Global.js');

// 修改package的文件name和description

class Write {
    constructor(creator) {
        this.options = creator.options;
        // 获取当前命令的执行目录，注意和项目目录区分
        this.cwd = process.cwd();
        this.basePath = path.join(__dirname,'../');
        this.init();
    }

    init() {
        this.projectPath = path.join(this.cwd, this.options.name);
        shell.mkdir('-p', this.projectPath);
        shell.cp('-R', path.join(this.basePath,'../template/*'), this.projectPath);
        this.writeJsonFile();
    }

    // 写入package文件
    writeJsonFile() {
        const jsonFilePath = path.join(this.projectPath, 'package.json');
        const jsonStr = fs.readFileSync(jsonFilePath);
        let data = JSON.parse(jsonStr);
        data = Object.assign(data, this.options);
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 4));
        // npm install
        shell.cd(this.projectPath);
        exec('npm install', (error, stdout, stderr) => {
            if (error) {
                Error(`exec error: ${error}`);
                return;
            }
            Info(`stdout: ${stdout}`);
            Warning(`stderr: ${stderr}`);
        });
    }
}

module.exports = Write;
