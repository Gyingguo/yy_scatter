/**
 * Created by carol on 2015/3/26.
 */
define(function(request, exports, module) {
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

    exports.paintPieChart = function() {
        pieChart = new Highcharts.Chart({
            chart: {
                renderTo: 'pie-chart',
                type: 'pie',
                events: {
                    drilldown: function (event) {
                        var id = event.point.drilldown
                        location.hash = '#!/' + id
                    }
                }
            },
            title: {
                text: '聚类分布'
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
                    textDecoration: 'none'
                }
            }
        })
    }
})
