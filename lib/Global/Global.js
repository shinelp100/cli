const chalk = require("chalk");

function Info(msg) {
    return console.log(chalk.green(msg))
}

function Error(msg) {
    return console.log(chalk.bold.red(msg))
}

function Warning(msg) {
    return console.log(chalk.keyword("orange")(msg))
}

function Success(msg) {
    return console.log(chalk.blue(msg))
}

function CustomColor(hex, msg) {
    return console.log(chalk.hex(hex)(msg))
}

module.exports = {
    Info,
    Error,
    Warning,
    Success,
    CustomColor
};
