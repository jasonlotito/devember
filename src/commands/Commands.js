const commands = new Map();

commands.set('AllCaps', require('./AllCaps'));
commands.set('NumberAdder', require('./NumberAdder'));
commands.set('SpeechWriter', require('./SpeechWriter'));
commands.set('ItemFetcher', require('./ItemFetcher'));
commands.set('DescribeCommand', require('./DescribeCommand'));
commands.set('ListCommands', require('./ListCommands'));

module.exports = commands;

