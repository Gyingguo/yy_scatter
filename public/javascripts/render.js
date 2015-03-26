/**
 * Created by carol on 2015/3/26.
 */
define(function(require, exports, module) {
    var paint = require("../javascripts/paintScatterChart");

    function randomColors(numberOfColors) {
        var colors = []
        var step = Math.floor(360 / numberOfColors)
        for (var i = 0; i < numberOfColors; i++) {
            colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)')
        }
        return colors
    }

    exports.render = function(data) {

        //var colors = randomColors(Math.max(data.children.length, 10));

        if (!data.topic) data.topic = '专利聚类';

        paint.paintScatterChart();

       // updateScatterChart(group, colors);
    }
})
