const commandMap = require('./Commands');

class DisplayList {
    /**
     *
     * @param {Map} v
     */
    execute(v) {

    }

    static describe() {
        return {
            input: {
                params: {}
            },
            output: {
                type: 'map'
            }
        }
    }
}

module.exports = DisplayList;