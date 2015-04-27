/**
 * Created by carol on 2015/3/26.
 */
define(function(require,exports,module) {
    var common = require('../common');
    var shareParams = require('../shareParams');
    var scatterSetting= require('../scatter/scatterSetting');
    var calculateAxis = require('../scatter/calculateAxis');
    var draggableScatter = require("../scatter/draggableScatter");

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
            var colors = common.common.randomColors(Math.max(data.children.length, 10));
            updateScatterChart(data, colors);
        },
        update: function (chart) {
            scatterSetting.scatterSetting.update(chart);
            shareParams.shareParams._scatterChart = new Highcharts.Chart(shareParams.shareParams._current_scater_chart);
            var data = shareParams.shareParams._scatter_data_json;
            var colors = common.common.randomColors(Math.max(data.children.length, 10));
            updateScatterChart(data, colors);
        },
        bindEvent: function() {
            var eventPoint = {
                    plotOptions: {
                        scatter: {
                            width: 10,
                            height: 10,
                            depth: 10
                        },
                        series: {
                            events: {
                                click: this.scatterExtendClickPoint(),   //刚好点击到节点
                                drag: this.scatterExtendDrag()
                            }
                        }
                    }
                };
            shareParams.shareParams._current_scater_chart.chart.events = {   //单击图表非节点区域
                click: this.scatterExtendClickChart()
            };
            $.extend(shareParams.shareParams._current_scater_chart, eventPoint);
        },
        plusMinusScatter: function (H, that) {
            var H = H || Highcharts;
            var that = that;
            var yOldMin = -1;
            var yOldMax = 1;
            var xOldMin = -1;
            var xOldMax = 1;
            Highcharts.Chart.prototype.callbacks.push(function (chart) {
                H.addEvent(chart.container, 'click', function (e) {
                    e = chart.pointer.normalize();
                    if (shareParams.shareParams._pm._flag !== 0) {
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

                        if (shareParams.shareParams._pm._flag === 1) { //放大plus
                            that.update(calculateAxis.calculateAxis.plus(xNewMin, xNewMax, yNewMin, yNewMax));
                        } else {
                            that.update(calculateAxis.calculateAxis.minus());
                        }
                    } else {
                        //return;
                    }
                });
            });
        },
        scatterExtendClickChart: function() {
            this.plusMinusScatter(Highcharts, this);
        },
        scatterExtendClickPoint: function() {
            this.plusMinusScatter(Highcharts, this);
        },
        scatterExtendDrag: function() {
            draggableScatter.draggableScatter(Highcharts);
        }
    }
})
