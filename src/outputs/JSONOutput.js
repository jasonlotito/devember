
class JSONOutput {
    constructor(res) {
        this.res = res;
    }

    display(data) {
        this.res.set('Content-Type', 'application/json');
        this.res.json(data);
    }

    static describe() {
        return 'json'
    }
}

module.exports = JSONOutput;