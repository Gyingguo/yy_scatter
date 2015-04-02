/**
 * Created by carol on 2015/4/1.
 */
define(function(require, exports, module) {
    var shareParams = require('../javascripts/shareParams');
    var flag_first_load = 1;
    exports.plusMinusScatter = function(H) {
        var H = H || Highcharts;
        var yOldMin = -1;
        var yOldMax = 1;
        var xOldMin = -1;
        var xOldMax = 1;
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            H.addEvent(chart.container, 'click', function (e) {
                if (shareParams.shareParams._pm._flag !== 0) {
                    e = chart.pointer.normalize();

                    yOldMin = shareParams.shareParams._scatterChart.yAxis[0].min;
                    yOldMax = shareParams.shareParams._scatterChart.yAxis[0].max;
                    xOldMin = shareParams.shareParams._scatterChart.xAxis[0].min;
                    xOldMax = shareParams.shareParams._scatterChart.xAxis[0].max;

                    var x = e.xAxis[0].value;
                    var y = e.yAxis[0].value;

                    yNewMin = yOldMin - y;
                    yNewMax = yOldMax + y;
                    xNewMin = xOldMin - x;
                    xNewMax = xOldMax + x;
                    //将缩放焦点区域移动到视觉中心的位置
                   // shareParams.shareParams._scatterChart.yAxis[0].update({min: yNewMin, max: yNewMax}, true);
                    //shareParams.shareParams._scatterChart.xAxis[0].update({min: xNewMin, max: xNewMax}, true);
                    //根据_pm中的_flag判断当前选择的是放大/缩小
                    if (shareParams.shareParams._pm._flag === 1) {
                        shareParams.shareParams._pm._plusMinusCount++;
                        shareParams.shareParams._scatterChart.yAxis[0].update({
                            min: yNewMin / shareParams.shareParams._pm._param, max: yNewMax / shareParams.shareParams._pm._param}, true);
                        shareParams.shareParams._scatterChart.xAxis[0].update({
                            min: xNewMin / shareParams.shareParams._pm._param, max: xNewMax / shareParams.shareParams._pm._param}, true);
                    } else {
                        shareParams.shareParams._scatterChart.yAxis[0].update({
                            min: -1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount - 1),
                            max: 1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount - 1)
                        }, true);
                        shareParams.shareParams._scatterChart.xAxis[0].update({
                            min: -1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount - 1),
                            max: 1 * Math.pow(2, shareParams.shareParams._pm._plusMinusCount - 1)
                        }, true);
                    }
                } else {
                    //return;
                }
            });
            H.addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                //console.log('Set extremes to ' + e.min + ', ' + e.max);
            });
        });
    }
})
