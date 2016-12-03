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

module.exports = NumberAdder;