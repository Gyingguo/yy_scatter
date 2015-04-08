/**
 * Created by carol on 2015/3/26.
 */
define(function(require, exports, module) {
    var paint = require("../javascripts/paintScatterChart");



    exports.render = function(data) {

        //var colors = randomColors(Math.max(data.children.length, 10));

        if (!data.topic) data.topic = '专利聚类';


        paint.paintScatterChart(data);

       // updateScatterChart(group, colors);
    }
})
