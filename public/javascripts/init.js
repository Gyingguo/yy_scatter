define(function(require,exports,module) {



    var paint = require("../javascripts/paintScatter");
    paint.paintScatter();

    var reload = require("../javascripts/reload");

    $(window).on('hashchange', reload.reload);
});


