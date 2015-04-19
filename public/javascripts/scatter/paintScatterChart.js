/**
 * Created by carol on 2015/3/26.
 */
define(function(require,exports,module) {
    var shareParams = require('../shareParams');
    var globalScatterChart = require('../global');

    function randomColors(numberOfColors) {
        var colors = [];
        var step = Math.floor(360 / numberOfColors);
        for (var i = 0; i < numberOfColors; i++) {
            colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)');
        }
        return colors;
    }

    function updateScatterChart(group, colors) {
        while (shareParams.shareParams._scatterChart.series.length > 0) {
            shareParams.shareParams._scatterChart.series[0].remove(false)
        }

        group.patents.forEach(function (patent, i) {
            if (!shareParams.shareParams._scatterChart.get(patent.group_id)) {
                var topic = $.grep(group.children, function (group) {
                    return group.id === patent.group_id
                })[0].topic;

                shareParams.shareParams._scatterChart.addSeries({
                    id: patent.group_id,
                    name: topic,
                    color: colors[i],
                    tooltip: {
                        headerFormat: '话题：{series.name} <br>',
                        pointFormat: '标题：{point.title} <br> 关键词：{point.keywords} <br> 摘要：{point.abstract}'
                    },
                    draggableY: true, //允许数据点纵向拖拽
                    draggableX: true //允许数据点横向拖拽
                }, false)
            }

            var x = patent.x;
            patent.x = patent.z;
            patent.z = x;

            shareParams.shareParams._scatterChart.get(patent.group_id).addPoint(patent, false);   //增加点所包含的信息
        })
        shareParams.shareParams._scatterChart.redraw();
    }

    exports.paintScatterChart = function(data) {
        globalScatterChart.global.init();    //每次paintScatterChart都要初始化全局变量
        shareParams.shareParams._scatter_data_json = data; //当前scatter图表中显示的数据
        var data = JSON.parse(data);
        var colors = randomColors(Math.max(data.children.length, 10));
        updateScatterChart(data, colors);
    }
})
