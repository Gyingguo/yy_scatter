/**
 * Created by carol on 2015/3/26.
 */
define(function(require, exports, module) {
    var shareParams = require('../javascripts/shareParams');
    var paint = require("../javascripts/scatter/paintScatterChart");

    exports.render = function(data) {
        if (!data.topic) data.topic = '专利聚类';
        paint.paintScatterChart.init(data, shareParams.shareParams._default_scatter_chart);
    }
})
