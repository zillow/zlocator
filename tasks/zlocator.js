module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('zlocator', 'Building source files with Locator, LocatorYUI, LocatorHandlebars', function () {
        var started = Date.now();
        var opts = grunt.config(['zlocator']);
        require('../bin/zlocator')(opts, this.async())
            .caught(function (ex) {
                grunt.fatal(ex.message);
                grunt.fatal(ex.stack);
            })
            .lastly(function () {
                var duration = (Date.now() - started) / 1000;
                grunt.log.writeln('Finished in %s second%s.', duration.toFixed(2), (duration !== 1 ? 's' : ''));
            });
    });
};