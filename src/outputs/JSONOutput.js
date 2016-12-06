
class JSONOutput {
    constructor(res) {
        this.res = res;
    }

    display(data) {
        this.res.set('Content-Type', 'application/json');
        if ( data[Symbol.iterator] ) {
            let d;
            const commandList = [];
            const iterator = data[Symbol.iterator]();
            while(d = iterator.next()) {
                if ( d.done ) {
                    break;
                }
                commandList.push(d.value)
            }

            this.res.json(commandList);
        } else {
            this.res.json(data);
        }

    }

    static describe() {
        return 'json'
    }
}

module.exports = JSONOutput;