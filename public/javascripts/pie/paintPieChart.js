/**
 * Created by carol on 2015/3/26.
 */
define(function(require, exports, module) {
    var common = require('../common');
    var pieChart = null;

    function updatePieChart(group, colors) {
        var series = {
            name: group.topic,
            data: $.map(group.children, function (group, i) {
                return {
                    name: group.topic,
                    y: group.size,
                    drilldown: group.id,
                    color: colors[i]
                }
            })
        }

        if (pieChart.series.length === 0) {
            pieChart.addSeries(series)
        } else {
            pieChart.series[0].update(series)
        }
    }

    exports.paintPieChart = function(data, posObj) {
        var data = JSON.parse(data);
        pieChart = new Highcharts.Chart({
            chart: {
                renderTo: posObj.id,
                type: 'pie',
                backgroundColor: 'black',
                events: {
                    drilldown: function (event) {
                        var id = event.point.drilldown
                        location.hash = '#!/' + id
                    }
                }
            },
            title: {
                text: data.topic || '聚类分布',
                style: {
                    color: 'white'
                }
            },
            tooltip: {
                headerFormat: '话题：{point.key} <br>',
                pointFormat: '百分比：{point.percentage:.1f}%，数量：{point.y}'
            },
            credits: {
                enabled: false
            },
            drilldown: {
                activeDataLabelStyle: {
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'normal'
                }
            }
        })

        var colors = common.common.randomColors(Math.max(data.children.length, 10));
        updatePieChart(data, colors);
    }
})
