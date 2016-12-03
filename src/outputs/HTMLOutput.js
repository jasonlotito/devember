
// Todo How would I output a template?
// Do I want to? Or is this just an API planner/system/thing?
class HTMLOutput {
    constructor(res) {
        this.res = res;
    }

    display(data) {
        this.res.set('Content-Type', 'text/html');
        console.log(data);

        switch (typeof data) {
            case 'object':
                this.res.send(JSON.stringify(data));
                break;
            case 'number':
                this.res.send(data + '');
                break;
            case 'string':
                this.res.send(data);
                break;

            default:
                this.res.send(data + '');
                break;
        }
    }
}

module.exports = HTMLOutput;