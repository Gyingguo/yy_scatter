/**
 * Created by carol on 2015/3/26.
 */
define(function(require,exports,module) {
    var shareParams = require('../shareParams');
    var util = require('../util');
    var scatterSetting= require('../scatter/scatterSetting');
    var draggableScatter = require("../scatter/draggableScatter");

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

    exports.paintScatterChart = {
        init: function (data, chart) {
            scatterSetting.scatterSetting.init(chart);    //初始化散点图的属性
            //绑定事件
            this.bindEvent();
            shareParams.shareParams._scatterChart = new Highcharts.Chart(shareParams.shareParams._current_scater_chart);
            shareParams.shareParams._scatter_data_json = data; //当前scatter图表中显示的数据
            var data = JSON.parse(data);
            var colors = randomColors(Math.max(data.children.length, 10));
            updateScatterChart(data, colors);
        },
        update: function (chart) {
            scatterSetting.scatterSetting.update(chart);
            shareParams.shareParams._scatterChart = new Highcharts.Chart(shareParams.shareParams._current_scater_chart);
            var data = JSON.parse(shareParams.shareParams._scatter_data_json);
            var colors = randomColors(Math.max(data.children.length, 10));
            updateScatterChart(data, colors);
        },
        bindEvent: function() {
            var event = {
                    plotOptions: {
                        scatter: {
                            width: 10,
                            height: 10,
                            depth: 10
                        },
                        series: {
                            events: {
                                click: this.scatterExtendClickPoint(),
                               drag: this.scatterExtendDrag()
                            }
                        }
                    }/*,
                    chart: {
                        events: {
                            //click: this.scatterExtendClickChart()
                        }
                    }*/
                };
            $.extend(shareParams.shareParams._current_scater_chart, event);
        },
        plusMinusScatter: function (H) {
            var H = H || Highcharts;
            var yOldMin = -1;
            var yOldMax = 1;
            var xOldMin = -1;
            var xOldMax = 1;
            Highcharts.Chart.prototype.callbacks.push(function (chart) {
                H.addEvent(chart.container, 'click', function (e) {
                    if (shareParams.shareParams._pm._flag !== 0) {
                        e = chart.pointer.normalize();

                        yOldMin = shareParams.shareParams._scatterChart.yAxis[0].min;
                        yOldMax = shareParams.shareParams._scatterChart.yAxis[0].max;
                        xOldMin = shareParams.shareParams._scatterChart.xAxis[0].min;
                        xOldMax = shareParams.shareParams._scatterChart.xAxis[0].max;

                        var x = null;
                        var y = null;

                        try {  //区别单击到点还是单击到图表
                            x = e.xAxis[0].value;
                            y = e.yAxis[0].value;
                        } catch (e) {
                            x = chart.hoverPoint.x;
                            y = chart.hoverPoint.y;
                        }

                        yNewMin = yOldMin - y;
                        yNewMax = yOldMax + y;
                        xNewMin = xOldMin - x;
                        xNewMax = xOldMax + x;
                        //将缩放焦点区域移动到视觉中心的位置
                        // shareParams.shareParams._scatterChart.yAxis[0].update({min: yNewMin, max: yNewMax}, true);
                        //shareParams.shareParams._scatterChart.xAxis[0].update({min: xNewMin, max: xNewMax}, true);
                        //根据_pm中的_flag判断当前选择的是放大/缩小
                        //console.log(shareParams.shareParams._scatterChart.zField);
                        var yAxisMin = null;
                        var yAxisMax = null;
                        var xAxisMin = null;
                        var xAxisMax = null;
                        var zAxisMin = null;
                        var zAxisMax = null;
                        if (shareParams.shareParams._pm._flag === 1) {
                            /*shareParams.shareParams._pm._plusMinusCount++;
                             yAxisMin = yNewMin / shareParams.shareParams._pm._param;
                             yAxisMax = yNewMax / shareParams.shareParams._pm._param;
                             xAxisMin = xNewMin / shareParams.shareParams._pm._param;
                             xAxisMax = xNewMax / shareParams.shareParams._pm._param;
                             zAxisMin = shareParams.shareParams._current_scater_chart.zAxis.min / shareParams.shareParams._pm._param;
                             zAxisMax = shareParams.shareParams._current_scater_chart.zAxis.max / shareParams.shareParams._pm._param;
                             global.global.update(
                             {
                             yAxis: {
                             min: yAxisMin,
                             max: yAxisMax,
                             title: {text: 'y'}
                             },
                             xAxis: {
                             min: xAxisMin,
                             max: xAxisMax,
                             title: {text: 'x'}
                             },
                             zAxis: {
                             min: zAxisMin,
                             max: zAxisMax,
                             title: {text: 'z'}
                             }
                             }
                             );
                             paint.paintScatterChart(shareParams.shareParams._scatter_data_json, shareParams.shareParams._current_scater_chart);*/
                            /*shareParams.shareParams._scatterChart.yAxis[0].update({
                             min: yNewMin / shareParams.shareParams._pm._param, max: yNewMax / shareParams.shareParams._pm._param}, true);
                             shareParams.shareParams._scatterChart.xAxis[0].update({
                             min: xNewMin / shareParams.shareParams._pm._param, max: xNewMax / shareParams.shareParams._pm._param}, true);*/
                        } else {
                            shareParams.shareParams._pm._plusMinusCount--;
                            /*shareParams.shareParams._scatterChart.yAxis[0].update({
                             min: -1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount),
                             max: 1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount)
                             }, true);
                             shareParams.shareParams._scatterChart.xAxis[0].update({
                             min: -1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount),
                             max: 1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount)
                             }, true);
                             */
                        }
                    } else {
                        //return;
                    }
                });
            });
        },
        scatterExtendClickChart: function() {
            this.plusMinusScatter(Highcharts);
        },
        scatterExtendClickPoint: function() {
            this.plusMinusScatter(Highcharts);
        },
        scatterExtendDrag: function() {
            draggableScatter.draggableScatter(Highcharts);
        }
    }
})
