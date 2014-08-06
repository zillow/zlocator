/**
CLI
**/

var options = require('./options');

exports.version = function () {
    return require('../package.json').version;
};

exports.interpret = function (argv, slice) {
    var opts = options.parse(argv, slice);
    if (opts.help) {
        console.log(options.usage());
    } else if (opts.version) {
        console.log(exports.version());
    } else {
        var started = Date.now();
        require('char-spinner')();
        require('./zlocator')(opts)
            .caught(function (ex) {
                console.error(ex.message);
                console.error(ex.stack);
            })
            .lastly(function () {
                var duration = (Date.now() - started) / 1000;
                console.log('Finished in %s second%s.', duration.toFixed(2), (duration > 1 ? 's' : ''));
            });
    }
};
