const HTMLOutput = require('./HTMLOutput');
const JSONOutput = require('./JSONOutput');

class Output {
    static createInstance(req, res, acceptableOutputs) {
        const acceptableOutput = req.accepts(acceptableOutputs);

        switch (acceptableOutput) {
            case 'html':
                return new HTMLOutput(res);
                break;
            case 'json':
                return new JSONOutput(res);
                break;
            default:
                return new JSONOutput(res);
                break;
        }
    }
}

module.exports = Output;