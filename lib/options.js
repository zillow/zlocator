/**
Option parsing, cleansing, and defaults.
**/

var path = require('path');
var nopt = require('nopt');

var knownOpts = {
    'applicationDirectory': path,
    'buildDirectory': path,
    'templateDirectory': path,
    'loaderTemplatePath': path,
    'help': Boolean,
    'quiet': Boolean,
    'version': Boolean,
    'compat': Boolean
};
var shortHand = {
    'h': ['--help'],
    'q': ['--quiet'],
    'v': ['--version']
};

exports.clean = function (opts) {
    // argv only exists when passed directly from nopt()
    if (!opts.hasOwnProperty('argv')) {
        nopt.clean(opts, knownOpts);
    }

    if (!opts.hasOwnProperty('cwd')) {
        opts.cwd = process.cwd();
    }

    return opts;
};

exports.parse = function (argv, slice) {
    var opts = nopt(knownOpts, shortHand, argv, slice);
    return exports.clean(opts);
};

exports.usage = function () {
    return 'TODO';
};
