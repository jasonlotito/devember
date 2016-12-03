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

module.exports = AllCaps;