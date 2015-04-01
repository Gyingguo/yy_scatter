define(function(require,exports,module) {
    var reload = require("../javascripts/reload");

    reload.reload();

    $(window).on('hashchange', reload.reload);

    //window._scatterChart = null;

    //extending
    /*var scatter = require('../javascripts/scatterExtend');
    scatter.scatterExtend(Highcharts);*/

    /*var scatter = require('../javascripts/columnExtend');
    scatter.columnExtend();

    var scatter = require('../javascripts/pieExtend');
    scatter.pieExtend();*/
});


