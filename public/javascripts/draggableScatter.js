/**
 * Created by carol on 2015/4/2.
 */
define(function(require, exports, module) {
    var shareParams = require('../javascripts/shareParams');

    exports.draggableScatter = function(H) {
        var H = H || Highcharts;
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            H.addEvent(chart.container, 'mousedown touchstart', function (e) {
                console.log('mousedown touchstart');
            });
            H.addEvent(chart.container, 'mousemove touchmove', function (e) {
                console.log('mousemove touchmove');
            });
        });
    }
})
