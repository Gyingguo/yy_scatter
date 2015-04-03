/**
 * Created by carol on 2015/4/2.
 */
define(function(require, exports, module) {
    var shareParams = require('../javascripts/shareParams');
    var flag = 0;
    var dragPoint = null;

    function isTopOrBottom(targetPoint) {  //判断落在哪个区域了
        var topArea = {
            'x': {
                'min': $('#left-charts-top')[0].offsetLeft,
                'max': $('#left-charts-top')[0].offsetLeft + $('#left-charts-top')[0].offsetWidth
            },
            'y': {
                'min': $('#left-charts-top')[0].offsetTop,
                'max': $('#left-charts-top')[0].offsetTop + $('#left-charts-top')[0].offsetHeight
            }
        };
        var bottomArea = {
            'x': {
                'min': $('#left-charts-bottom')[0].offsetLeft,
                'max': $('#left-charts-bottom')[0].offsetLeft + $('#left-charts-bottom')[0].offsetWidth
            },
            'y': {
                'min': $('#left-charts-bottom')[0].offsetTop,
                'max': $('#left-charts-bottom')[0].offsetTop + $('#left-charts-bottom')[0].offsetHeight
            }
        };
        var x = targetPoint.clientX;
        var y = targetPoint.clientY;
        console.log(x + " " + y);
        console.log(topArea);
        console.log(bottomArea);
        if(x >= topArea.x.min && x <= topArea.x.max && y >= topArea.y.min && y <= topArea.y.max) {
            return 1;
        } else if (x >= bottomArea.x.min && x <= bottomArea.x.max && y >= bottomArea.y.min && y <= bottomArea.y.max) {
            return -1;
        } else {
            return 0;
        }
    }

    exports.draggableScatter = function(H) {
        var H = H || Highcharts;
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            H.addEvent(chart.container, 'mousedown touchstart', function (e) {
                dragPoint = chart.hoverPoint;
                //console.log('dragPoint' + dragPoint.keywords);   //获取单击点的点属性
                //options = JSON.stringify(dragPoint.series.options); //得到的是单击点所处簇的所有信息
                flag = 1;
            });
            H.addEvent(document, 'mouseup touchup', function (e) {
                if(flag) {
                    var upPoint = {   //鼠标抬起时的点
                        "clientX": e.clientX,
                        "clientY": e.clientY
                    };
                    isTopOrBottom(upPoint);
                    console.log(isTopOrBottom(upPoint))
                }
                flag = 0;
            });
        });

    }
})
