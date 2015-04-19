/**
 * Created by carol on 2015/3/26.
 */
define(function(require, exports, module) {

    var paint = require("../javascripts/scatter/paintScatterChart");

    exports.render = function(data) {

        if (!data.topic) data.topic = '专利聚类';
        paint.paintScatterChart(data);
    }
})
