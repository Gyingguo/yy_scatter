define(function(require,exports,module) {
    var reload = require("../javascripts/reload");

    reload.reload();

    $(window).on('hashchange', reload.reload);
});


