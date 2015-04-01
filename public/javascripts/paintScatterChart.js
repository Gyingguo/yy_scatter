/**
 * Created by carol on 2015/3/26.
 */
define(function(require,exports,module) {
    var globalScatterChart = require('../javascripts/global');
    var params = require('../javascripts/params');

    globalScatterChart.global.init();

    function randomColors(numberOfColors) {

        var colors = [];
        var step = Math.floor(360 / numberOfColors);
        for (var i = 0; i < numberOfColors; i++) {
            colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)');
        }
        return colors;
    }

    function updateScatterChart(group, colors) {
        while (params.params._scatterChart.series.length > 0) {
            params.params._scatterChart.series[0].remove(false)
        }

        group.patents.forEach(function (patent, i) {
            if (!params.params._scatterChart.get(patent.group_id)) {
                var topic = $.grep(group.children, function (group) {
                    return group.id === patent.group_id
                })[0].topic;

                params.params._scatterChart.addSeries({
                    id: patent.group_id,
                    name: topic,
                    color: colors[i],
                    tooltip: {
                        headerFormat: '话题：{series.name} <br>',
                        pointFormat: '标题：{point.title} <br> 关键词：{point.keywords} <br> 摘要：{point.abstract}'
                    }
                }, false)
            }

            var x = patent.x;
            patent.x = patent.z;
            patent.z = x;

            params.params._scatterChart.get(patent.group_id).addPoint(patent, false);   //增加点所包含的信息
        })

        params.params._scatterChart.redraw();

    }

    exports.paintScatterChart = function(data) {
        //console.log(params.params._scatterChart);
        var data = JSON.parse(data);
        var colors = randomColors(Math.max(data.children.length, 10));
        updateScatterChart(data, colors);
    }

})
