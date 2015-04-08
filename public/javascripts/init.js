define(function(require,exports,module) {
    var reload = require("../javascripts/reload");
    var menu = require("../javascripts/menu");

    reload.reload();
    menu.menu();

    $(window).on('hashchange', reload.reload);

    //extending
    /*var scatter = require('../javascripts/scatterExtend');
    scatter.scatterExtend(Highcharts);*/

    /*var scatter = require('../javascripts/columnExtend');
    scatter.columnExtend();

    var scatter = require('../javascripts/pieExtend');
    scatter.pieExtend();*/
});


