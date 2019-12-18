const fs = require('fs');
const chalk = require("chalk");
// https://www.npmjs.com/package/inquirer#question
const inquirer = require('inquirer');

class Ask {
    constructor() {
        this.options = {
            name: "",
            description: ""
        }
    }

    ask() {
        return inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: chalk.blue('请输入项目名称'),
            validate(input) {
                if (!input) {
                    return '项目名不能为空';
                }
                if (fs.existsSync(input)) {
                    return '项目名已重复';
                }
                return true;
            },
            prefix: chalk.green('[ Info ]'),
            suffix: chalk.keyword('orange')(':')
        },
        {
            type: 'input',
            name: 'description',
            message: chalk.blue('请输入项目描述'),
            prefix: chalk.red('[ Info ]'),
            suffix: chalk.keyword('orange')(':'),
            choices: ["Choice A", new inquirer.Separator(), "choice B"]
        },
        {
            type: 'input',
            name: 'author',
            message: chalk.blue('请输入作者'),
            prefix: chalk.blue('[ Info ]'),
            suffix: chalk.keyword('orange')(':'),
        }
        ])
        .then(answers => {
            this.options = Object.assign({}, this.options, answers);
        });
    }

}

module.exports = Ask;
