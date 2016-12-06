
class ListCommands {
    execute(v) {
        return require('./Commands').keys();
    }

    static describe() {
        return {
            description: "Returns a list of the available commands",
            input: {
                params: {}
            },
            output: {
                type: 'map'
            }
        }
    }
}

module.exports = ListCommands;