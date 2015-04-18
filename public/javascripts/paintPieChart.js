/**
 * Created by carol on 2015/3/26.
 */
define(function(request, exports, module) {
    var pieChart = null;

    function randomColors(numberOfColors) {

        var colors = [];
        var step = Math.floor(360 / numberOfColors);
        for (var i = 0; i < numberOfColors; i++) {
            colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)');
        }
        return colors;
    }

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
                text: '聚类分布',
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

        var data = JSON.parse(data);
        var colors = randomColors(Math.max(data.children.length, 10));
        updatePieChart(data, colors);
    }
})
