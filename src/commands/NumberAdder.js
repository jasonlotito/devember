class NumberAdder {
    execute(x, y) {
        return parseInt(x, 10) + parseInt(y, 10);
    }

    static describe() {

        function normalizeInteger(v) {
            return parseInt(v, 10);
        }

        return {
            description: 'Given two numbers, it will add them together',
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
            },
            output: {
                type: 'integer'
            }
        }
    }
}

module.exports = NumberAdder;