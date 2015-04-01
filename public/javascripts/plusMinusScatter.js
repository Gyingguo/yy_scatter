/**
 * Created by carol on 2015/4/1.
 */
define(function(require, exports, module) {
   //var globalScatterChart = require('../javascripts/params');

    exports.plusMinusScatter = function(H) {
        var H = H || Highcharts;
        /*var yOldMin = globalScatterChart.global._scatterChart.yAxis.min;
        var yOldMax = globalScatterChart.global._scatterChart.yAxis.max;
        var xOldMin = globalScatterChart.global._scatterChart.xAxis.min;
        var xOldMax = globalScatterChart.global._scatterChart.xAxis.max;*/
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            H.addEvent(chart.container, 'click', function (e) {
                e = chart.pointer.normalize();

                /*globalScatterChart.global._scatterChart.yAxis.min = e.yAxis[0].value - _pm._param;
                globalScatterChart.global._scatterChart.yAxis.max = e.yAxis[0].value + _pm._param;
                globalScatterChart.global._scatterChart.xAxis.min = e.xAxis[0].value - _pm._param;
                globalScatterChart.global._scatterChart.xAxis.max = e.xAxis[0].value + _pm._param;
                globalScatterChart.global._scatterChart.redraw();*/
                 //console.log("y: " + e.yAxis[0].value + " x: " + e.xAxis[0].value);
                console.log('Clicked chart at ' + e.chartX + ', ' + e.chartY);
            });
            H.addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                //console.log('Set extremes to ' + e.min + ', ' + e.max);
            });
        });
    }
})
