/**
 * Created by carol on 2015/3/26.
 */
define(function(require,exports,module) {
    /*(function (H) {
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            H.addEvent(chart.container, 'click', function (e) {
                e = chart.pointer.normalize();
                console.log('Clicked chart at ' + e.chartX + ', ' + e.chartY);
            });
            H.addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                console.log('Set extremes to ' + e.min + ', ' + e.max);
            });
        });
    }(Highcharts));*/
    var scatterChart = new Highcharts.Chart({
        chart: {
            renderTo: 'scatter-chart',
            type: 'scatter',
            height: 600,
            spacingLeft: 300,
            spacingRight: 300,
            backgroundColor: 'black',
            options3d: {
                enabled: true,
                alpha: 5,
                beta: 16,
                depth: 400,
                viewDistance: 5,
                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
        },
        title: {
            text: '专利分布'
        },
        plotOptions: {
            scatter: {
                width: 10,
                height: 10,
                depth: 10
            }
        },
        yAxis: {
            min: -1,
            max: 1,
            title: {text: 'y'}
        },
        xAxis: {
            min: -1,
            max: 1,
            title: {text: 'x'},
            gridLineWidth: 1
        },
        zAxis: {
            min: -1,
            max: 1,
            title: {text: 'z'}
        },
        tooltop: {
            useHTML: true
        },
        legend: {
            enabled: false
        }
    });

    function randomColors(numberOfColors) {
        var colors = [];
        var step = Math.floor(360 / numberOfColors);
        for (var i = 0; i < numberOfColors; i++) {
            colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)');
        }
        return colors;
    }

    function updateScatterChart(group, colors) {
        while (scatterChart.series.length > 0) {
            scatterChart.series[0].remove(false)
        }

        group.patents.forEach(function (patent, i) {
            if (!scatterChart.get(patent.group_id)) {
                var topic = $.grep(group.children, function (group) {
                    return group.id === patent.group_id
                })[0].topic;

                scatterChart.addSeries({
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

            scatterChart.get(patent.group_id).addPoint(patent, false);
        })

        scatterChart.redraw();
    }

    exports.paintScatterChart = function(data) {
        var data = JSON.parse(data);
        var colors = randomColors(Math.max(data.children.length, 10));
        updateScatterChart(data, colors);
    }
})
