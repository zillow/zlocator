module.exports = {
    // nameKey defaults to 1
    // selectorKey has no default. selector is only used if selectorKey is given
    main: {
        // we can use this to skip files
        _skip: [
            /^src\/.*?\/test\b/i,
            /^tests?\b/i
        ],

        // where to find LESS files
        less: {
            regex: /^src\/.*?\/less\/([a-z_\-\/]+)\.less$/i
        }
    }
};
