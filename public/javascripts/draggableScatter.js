/**
 * Created by carol on 2015/4/2.
 */
define(function(require, exports, module) {
    var shareParams = require('../javascripts/shareParams');
    var paintPieChart = require('../javascripts/paintPieChart');
    var paintColumnChart = require('../javascripts/paintColumnChart');
    var paintLineChart = require('../javascripts/paintLineChart');

    var flag = 0;
    var dragPoint = null;
    var upPosition = 0;

    function isTopOrBottom(targetPoint) {  //判断落在哪个区域了
        //从shareParams的_dragChartType中判断，获得当前页面拥有的
        var area = {
            'x': {
                'min': null,
                'max': null
            },
            'y': {
                'min': null,
                'max': null
            }
        };
        var x = targetPoint.clientX;
        var y = targetPoint.clientY;
        var putAbleArea = shareParams.shareParams._dragChartType;
        for(var i = 0; i < putAbleArea.length; i++) {
            area.x.min = $(putAbleArea[i].id)[0].offsetLeft;
            area.x.max = $(putAbleArea[i].id)[0].offsetLeft + $(putAbleArea[i].id)[0].offsetWidth;
            area.y.min = $(putAbleArea[i].id)[0].offsetTop;
            area.y.max = $(putAbleArea[i].id)[0].offsetTop + + $(putAbleArea[i].id)[0].offsetHeight;
            if (x >= area.x.min && x <= area.x.max && y >= area.y.min && y <= area.y.max) {
                return putAbleArea[i].flag;
            }
        }
        return 0;
    }

    function drawWithDragData() {
        if (upPosition === 1) {
            var test = shareParams.shareParams._scatterChart;

            console.log('drag: ' + JSON.stringify(test));
            paintPieChart.paintPieChart(shareParams.shareParams._scatterChart, upPosition);
        } else if (upPosition === 2) {
            paintColumnChart(shareParams.shareParams._scatterChart, upPosition);
        } else if (upPosition === 3) {
            paintLineChart(shareParams.shareParams._scatterChart, upPosition);
        } else {

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
                    upPosition = isTopOrBottom(upPoint);
                    drawWithDragData();
                }
                flag = 0;
            });
        });

    }
})
