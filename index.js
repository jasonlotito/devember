const getConfig = require('./etc/routes.json');

const express = require('express');
const AllCaps = require('./src/commands/AllCaps');
const NumberAdder = require('./src/commands/NumberAdder');
const SpeechWriter = require('./src/commands/SpeechWriter');
const ItemFetcher = require('./src/commands/ItemFetcher');
const DescribeCommand = require('./src/commands/DescribeCommand');
const Output = require('./src/outputs/Output');

const app = express();

const commandMap = new Map();
commandMap.set('AllCaps', AllCaps);
commandMap.set('NumberAdder', NumberAdder);
commandMap.set('SpeechWriter', SpeechWriter);
commandMap.set('ItemFetcher', ItemFetcher);
commandMap.set('DescribeCommand', DescribeCommand);

// Todo clean this up it's ugly as sin
getConfig.forEach((routeSetting) => {

    let commandList = [];
    commandList.push(routeSetting.route);

    routeSetting.command.forEach((commandName, k) => {
        if ( !commandMap.has(commandName) ) {
            throw new Error(`Command '${commandName}' is missing. Required by route ${routeSetting.route}.`)
        }

        const command = commandMap.get(commandName);
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
                } else if (v.source == 'command') {
                    paramValue = req._data;
                } else if (v.source.startsWith('command.')) {
                    console.log(req._data);
                    paramValue = req._data.description;
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
