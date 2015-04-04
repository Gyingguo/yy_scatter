/**
 * Created by carol on 2015/3/26.
 */
define(function(request, exports, module) {
    function updateColumnChart(group, colors) {
        var series = {
            colorByPoint: true,
            data: $.map(group.keywords, function (keyword, i) {
                return {
                    name: keyword.name,
                    y: keyword.weight,
                    color: colors[i]
                }
            })
        }

        if (columnChart.series.length === 0) {
            columnChart.addSeries(series)
        } else {
            columnChart.series[0].update(series)
        }
    }

    exports.paintColumnChart = function(data, flag) {
        columnChart = new Highcharts.Chart({
            chart: {
                renderTo: 'column-chart',
                type: 'column'
            },
            title: {
                text: '排名前10关键词'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {text: '权重'}
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '关键词：{point.key} <br>',
                pointFormat: '权重：{point.y:.3f}'
            },
            credits: {
                enabled: false
            }
        })
    }
})
