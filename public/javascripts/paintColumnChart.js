/**
 * Created by carol on 2015/3/26.
 */
define(function(request, exports, module) {
    var columnChart = null;

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

    function randomColors(numberOfColors) {

        var colors = [];
        var step = Math.floor(360 / numberOfColors);
        for (var i = 0; i < numberOfColors; i++) {
            colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)');
        }
        return colors;
    }

    exports.paintColumnChart = function(data, posObj) {
        columnChart = new Highcharts.Chart({
            chart: {
                renderTo: posObj.id,
                type: 'column',
                backgroundColor: 'black',
            },
            title: {
                text: '排名前10关键词',
                style: {
                    color: 'white'
                }
            },
            xAxis: {
                type: 'category',
                labels:{
                    style: {
                        color: 'white'
                    }
                }
            },
            yAxis: {
                title: {text: '权重'},
                labels:{
                    style: {
                        color: 'white'
                    }
                }
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
        });

        var data = JSON.parse(data);
        var colors = randomColors(Math.max(data.children.length, 10));
        updateColumnChart(data, colors);
    }
})
