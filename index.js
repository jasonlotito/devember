const express = require('express');
const app = express();

const postConfig = [];

// Todo need to do type checking on input
// Todo output descriptions?

function addTwoNumbers(x, y) {
    return parseInt(x, 10) + parseInt(y, 10);
}

class AllCaps {
    execute(v) {
        return v.toUpperCase();
    }

    static describe() {
        return {
            input: {
                params: {
                    text: {
                        type: 'string',
                        description: "This is the text that we are uppercasing",
                        default: 'Hello world'
                    }
                }
            }
        }
    }
}

class SpeechWriter {
    execute(v) {
        return 'The answer is: ' + v;
    }

    static describe() {
        return {
            input: {
                params: {
                    speech: {
                        type: 'string',
                        description: "This can be any string or variable that can be converted to a string",
                        default: 'Hello world'
                    }
                }
            }
        }
    }
}

class NumberAdder {
    execute(x, y) {
        return parseInt(x, 10) + parseInt(y, 10);
    }

    static describe() {

        function normalizeInteger(v) {
            return parseInt(v, 10);
        }

        return {
            // Todo this shouldn't handle the route, it should describe what's needed as input
            command: addNumbers,
            input: {
                params: {
                    one: {
                        name: 'one',
                        default: 0,
                        normalize: normalizeInteger,
                        type: 'integer',
                        description: 'A number to add'
                    },
                    two: {
                        name: 'two',
                        default: 0,
                        normalize: normalizeInteger,
                        type: 'integer',
                        description: 'A number to add'
                    }
                }
            }
        }
    }
}

function addNumbers(req, res, next) {
    res.json(addTwoNumbers(req.param('one', 0), req.param('two', 0)));
}

function sayHelloWorld(req, res, next) {
    res.send('Hello World!!')
}

const getConfig = [
    {
        route: `/add/:one/:two`,
        command: [NumberAdder],
        routeInput: [[
            {
                source: 'req',
                key: 'one',
                param: 'one'
            },
            {
                source: 'req',
                key: 'two',
                param: 'two'
            }
        ]]
    },
    {
        route: `/descriptiveAdd/:one/:two`,
        command: [NumberAdder, SpeechWriter],
        routeInput: [[
            {
                source: 'req',
                key: 'one',
                param: 'one'
            },
            {
                source: 'req',
                key: 'two',
                param: 'two'
            }
        ], [
            {
                param: 'speech',
                source:'command'
            }
        ]]
    },
    {
        route: `/capsAdd/:one/:two`,
        command: [NumberAdder, SpeechWriter, AllCaps],
        routeInput: [[
            {
                source: 'req',
                key: 'one',
                param: 'one'
            },
            {
                source: 'req',
                key: 'two',
                param: 'two'
            }
        ], [
            {
                param: 'speech',
                source:'command'
            }
        ],  [
            {
                param: 'text',
                source:'command'
            }
        ]]
    }
];

getConfig.forEach((routeSetting) => {

    let commandList = [];
    commandList.push(routeSetting.route);

    routeSetting.command.forEach((command, k) => {
        const commandObj = new command();

        // TODO We need to make this flexible and fix it
        commandList.push((req, res, next) => {
            const paramList = [];

            routeSetting.routeInput[k].forEach((v) => {
                const key = v.key;
                const param = v.param;
                const paramSetting = command.describe().input.params[param];

                let paramValue;

                if ( v.source == 'req') {
                    paramValue = req.param(key, paramSetting.default);
                } else {
                    paramValue = req._data;
                }

                let normalizeFunc = paramSetting.normalize || (x => { return x; });
                paramList.push(normalizeFunc(paramValue))
            });

            req._data = commandObj.execute.apply(commandObj, paramList);
            next();
        });
    });

    commandList.push((req, res) => {
        res.json(req._data);
        res.end();
    });

    console.log(commandList);
    app.get.apply(app, commandList);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
