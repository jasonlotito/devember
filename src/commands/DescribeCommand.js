class DescribeCommand {
    execute(commandName) {
        const command = require(`./${commandName}`);
        return command.describe();
    }

    static describe() {
        return {
            description: 'Returns the description of commands',
            input: {
                params: {
                    commandName: {
                        type: 'string',
                        description: "This is the name of the command",
                        default: 'DescribeCommand'
                    }
                }
            },
            output: {
                type: 'object',
                describe: {
                    input: {
                        params: {
                            '*...': {
                                type: 'string',
                                description: 'string',
                                default: 'mixed'
                            }
                        }
                    },
                    output: {
                        type: 'string',
                        'describe?': 'object'
                    }
                }
            }
        }
    }
}

module.exports = DescribeCommand;