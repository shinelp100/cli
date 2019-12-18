const {Info, Error, Warning, Success, CustomColor} = require('./Global/Global.js');
const Ask = require('./Global/Ask.js');
const Write = require('./template/index');

class Creator extends Ask {
    constructor() {
        super()
    }

    init() {
        Info('my cli 构建开始');
        this.ask().then(() => {
            new Write(this);
            Success('my cli 构建完成');
            Info(`开始项目:  cd ${ this.options.name } && npm install`);
        });
    }
}

module.exports = Creator;
