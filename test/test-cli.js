/*global describe, it, expect */

var options = require('../lib/options');
var cli = require('../lib/cli');

describe('cli', function () {
    describe('version()', function () {
        it('returns package.json version', function () {
            var pkg = require('../package.json');
            expect(cli.version()).to.equal(pkg.version);
        });
    });

    describe('interpret()', function () {
        it('TODO');
    });
});
