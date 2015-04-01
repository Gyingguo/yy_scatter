/**
 * Created by carol on 2015/4/1.
 */
define(function(require, exports, module) {
    var shareParams = require('../javascripts/shareParams');

    exports.plusMinusScatter = function(H) {

        var H = H || Highcharts;
        var yOldMin = null;
        var yOldMax = null;
        var xOldMin = null;
        var xOldMax = null;
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            /*yOldMin = shareParams.shareParams._scatterChart.yAxis[0].min;
            yOldMax = shareParams.shareParams._scatterChart.yAxis[0].max;
            xOldMin = shareParams.shareParams._scatterChart.xAxis[0].min;
            xOldMax = shareParams.shareParams._scatterChart.xAxis[0].max;*/
            H.addEvent(chart.container, 'click', function (e) {
                e = chart.pointer.normalize();
                yNewMin = e.yAxis[0].value - shareParams.shareParams._pm._param;
                yNewMax = e.yAxis[0].value + shareParams.shareParams._pm._param;
                xNewMin = e.xAxis[0].value - shareParams.shareParams._pm._param;
                xNewMax = e.xAxis[0].value + shareParams.shareParams._pm._param;
                shareParams.shareParams._scatterChart.yAxis[0].update({min:yNewMin,max:yNewMax},true);
                shareParams.shareParams._scatterChart.xAxis[0].update({min:xNewMin,max:xNewMax},true);
                /*console.log("after " + shareParams.shareParams._scatterChart.yAxis[0].min);
                console.log("after " + shareParams.shareParams._scatterChart.yAxis[0].max);
                console.log("after " + shareParams.shareParams._scatterChart.xAxis[0].min);
                console.log("after " + shareParams.shareParams._scatterChart.xAxis[0].max);*/
                //console.log('Clicked chart at ' + e.chartX + ', ' + e.chartY);
                console.log(shareParams.shareParams._scatterChart.options);
            });
            H.addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                //console.log('Set extremes to ' + e.min + ', ' + e.max);
            });
        });
    }
})
