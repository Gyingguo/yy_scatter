/**
 * Created by carol on 2015/4/1.
 */
define(function(require, exports, module) {
    exports.plusMinusScatter = function(H) {
        var H = H || Highcharts
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            H.addEvent(chart.container, 'click', function (e) {
                e = chart.pointer.normalize();
                console.log('Clicked chart at ' + e.chartX + ', ' + e.chartY);
            });
            H.addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                console.log('Set extremes to ' + e.min + ', ' + e.max);
            });
        });
    }
})
