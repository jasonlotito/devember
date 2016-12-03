const express = require('express');
const app = express();

const AllCaps = require('./src/commands/AllCaps');
const NumberAdder = require('./src/commands/NumberAdder');
const SpeechWriter = require('./src/commands/SpeechWriter');
const ItemFetcher = require('./src/commands/ItemFetcher');
const Output = require('./src/outputs/Output');

const postConfig = [];

// Todo handle context of output from API

// Todo command output descriptions?
// Todo need to do type checking on input
// Todo make this a Map
const getConfig = [
    {
        route: '/item/:id',
        command: [ItemFetcher],
        routeInput: [[
            {
                source: 'req',
                key: 'id',
                param: 'itemId'
            }
        ]],
        output: [
            'json'
        ]
    },
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
        ]],
        output: [
            'json',
            'html'
        ]
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
                source: 'command'
            }
        ]],
        output: [
            'json',
            'html'
        ]
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
                source: 'command'
            }
        ], [
            {
                param: 'text',
                source: 'command'
            }
        ]],
        output: [
            'json'
        ]
    }
];

// Todo clean this up it's ugly as sin
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

                if (v.source == 'req') {
                    paramValue = req.params[key] || paramSetting.default;
                } else {
                    paramValue = req._data;
                }

                let normalizeFunc = paramSetting.normalize || (x => {
                        return x;
                    });
                paramList.push(normalizeFunc(paramValue))
            });
            req._data = commandObj.execute.apply(commandObj, paramList);
            next();

        });


    });


    commandList.push((req, res) => {
        const outputInstance = Output.createInstance(req, res, routeSetting.output);
        outputInstance.display(req._data);
        res.end();
    });

    app.get.apply(app, commandList);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
