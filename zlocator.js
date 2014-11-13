module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('zlocator', 'Building js, mustache templates', function () {
        var started = Date.now();
        var opts = grunt.config(['zlocator']);
        require('../bin/zlocator')(opts, this.async())
            .caught(function (ex) {
                console.error(ex.message);
                console.error(ex.stack);
            })
            .lastly(function () {
                var duration = (Date.now() - started) / 1000;
                console.log('Finished in %s second%s.', duration.toFixed(2), (duration > 1 ? 's' : ''));
            });
    });
};