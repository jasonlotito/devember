class SpeechWriter {
    execute(v) {
        return 'The answer is: ' + v;
    }

    static describe() {
        return {
            input: {
                params: {
                    speech: {
                        type: 'string',
                        description: "This can be any string or variable that can be converted to a string",
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

module.exports = SpeechWriter;