class Commands {
    /**
     *
     * @returns {Commands}
     */
    registerCommands() {
        let commands = new Map();

        commands.set('AllCaps', require('./AllCaps'));
        commands.set('NumberAdder', require('./NumberAdder'));
        commands.set('SpeechWriter', require('./SpeechWriter'));
        commands.set('ItemFetcher', require('./ItemFetcher'));
        commands.set('DescribeCommand', require('./DescribeCommand'));
        commands.set('ListCommands', require('./ListCommands'));
        commands.set('ListRoutes', require('./ListRoutes')(require('../../etc/routes.json')));
        commands.set('DescribeRoute', require('./DescribeRoute'));

        this.commands = commands;

        return this;
    }

    get(commandName) {
        let command = this.commands.get(commandName);
        return this.configureCommand(command, command.configuration);
    }

    keys() {
        return this.commands.keys();
    }

    configureCommand(command, commandConfiguration) {
        if (!commandConfiguration) {
            return command;
        }

        const configurationList = [];
        commandConfiguration.forEach((config) => {
            let configuration;
            switch (config.type) {
                case 'project_env':
                    configuration = require(`../../etc/${config.file}`);
                    break;
            }

            configurationList.push(configuration);
        });

        return command.configure.apply(command, configurationList);
    }

    has(commandName) {
        return this.commands.has(commandName);
    }
}

module.exports = (new Commands()).registerCommands();
