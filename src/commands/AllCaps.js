class AllCaps {
    execute(v) {
        if ( typeof v == 'object' ) {
            return JSON.stringify(v).toUpperCase();
        } else {
            return v.toUpperCase();
        }
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
            },
            output: {
                type: 'string'
            }
        }
    }
}

module.exports = AllCaps;