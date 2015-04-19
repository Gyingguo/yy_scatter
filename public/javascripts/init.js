//全局入口函数
define(function(require,exports,module) {
    var reload = require("../javascripts/reload");
    var menu = require("../javascripts/menu");

    reload.reload();
    menu.menu();

    $(window).on('hashchange', reload.reload);
});


