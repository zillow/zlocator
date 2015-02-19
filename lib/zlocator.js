/**
ZLocator
**/

module.exports = zlocator;

var path = require('path');
var EE = require('events').EventEmitter;
var inherits = require('inherits');

var PromiseImpl = require('bluebird');
var Locator = require('locator');
var LocatorHandlebars = require('locator-handlebars');
var LocatorYUI = require('locator-yui');
var Handlebars = require('yui/handlebars').Handlebars;

var clean = require('./options').clean;
var extend = require('util')._extend;

function zlocator(options, cb) {
    return new ZLocator(options, cb).promise;
}

zlocator.ZLocator = ZLocator;
inherits(ZLocator, EE);
function ZLocator(options, cb) {
    EE.call(this);
    this.options = clean(options || {});
    this.promise = this.getLocator().then(this.parseBundle).nodeify(cb);
}

ZLocator.prototype.getLocator = function () {
    var locator = new Locator({
        applicationDirectory: this.options.applicationDirectory,
        buildDirectory: this.options.buildDirectory
    });

    return PromiseImpl.resolve(locator).bind(this)
        .then(this.plugHandlebars)
        .then(this.plugYUI);
};

ZLocator.prototype._hbsNameParser = function () {
    var templateDirectory = this.options.templateDirectory;
    return function hbsNameParser(sourcePath) {
        // return path.basename(sourcePath, path.extname(sourcePath));
        return path.join(
            path.dirname(
                path.relative(templateDirectory, sourcePath)
            ),
            path.basename(sourcePath, path.extname(sourcePath))
        ).split(path.sep).join('-');
    };
};

ZLocator.prototype.plugHandlebars = function (locator) {
    var loch = new LocatorHandlebars({
        prefix: this.options.prefix,
        format: 'yui',
        handlebars: Handlebars
    });

    loch.describe.extensions.push('mustache');
    loch.nameParser = this._hbsNameParser();

    return locator.plug(loch);
};

ZLocator.prototype.plugYUI = function (locator) {
    var shifterOptions = {
            quiet: this.options.quiet
        };
    if (this.options.shifterOptions) {
        shifterOptions = extend(shifterOptions, this.options.shifterOptions);
    }
    console.log(this.options);
    var locy = new LocatorYUI({
        loaderTemplatePath: this.options.loaderTemplatePath,
        coverage: true,
        shifterOptions: shifterOptions
    });

    return locator.plug(locy);
};

ZLocator.prototype.parseBundle = function (locator) {
    return locator.parseBundle(this.options.applicationDirectory || this.options.cwd, {
        bundleBuildDirectoryParser: function (bundle) {
            // return bundle.name + '-' + bundle.version; // default
            return bundle.name;
        }
    });
};
