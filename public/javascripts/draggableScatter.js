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
    var options = null;
    var upPosition = 0;

    var leftChartsTopArea = null;
    var leftChartsBottomArea = null;

    var currentObj = null;    //当前有效的区域的节点

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

        if (x >= leftChartsTopArea.x.min && x <= leftChartsTopArea.x.max &&
            y >= leftChartsTopArea.y.min && y <= leftChartsTopArea.y.max) {
            currentObj = $('#left-charts-top').children()[0];
            var id = 'left-charts-top-' + currentObj.className;
            currentObj.setAttribute('id',id);
            return shareParams.shareParams._dragChartType[currentObj.className];
        } else if (x >= leftChartsBottomArea.x.min && x <= leftChartsBottomArea.x.max &&
            y >= leftChartsBottomArea.y.min && y <= leftChartsBottomArea.y.max) {
            currentObj = $('#left-charts-bottom').children()[0];
            var id = 'left-charts-bottom-' + currentObj.className;
            currentObj.setAttribute('id',id);
            return shareParams.shareParams._dragChartType[currentObj.className];
        } else {
            return 0;
        }
    }

    function drawWithDragData() {
        if (upPosition === 1) {
            //console.log('drag:' + shareParams.shareParams._scatterChart.series.length);
            paintPieChart.paintPieChart(shareParams.shareParams._scatter_data_json, currentObj);
        } else if (upPosition === 2) {
            //console.log(options.data[0].group_id);
            paintColumnChart.paintColumnChart(options, currentObj);
        } else if (upPosition === 3) {
            paintLineChart.paintLineChart(shareParams.shareParams._scatterChart, currentObj);
        } else {

        }
    }

    exports.draggableScatter = function(H) {
        var H = H || Highcharts;
        leftChartsTopArea = {
            'x': {
                'min': $('#left-charts-top')[0].offsetLeft,
                'max': $('#left-charts-top')[0].offsetLeft + $('#left-charts-top')[0].offsetWidth
            },
            'y': {
                'min': $('#left-charts-top')[0].offsetTop,
                'max': $('#left-charts-top')[0].offsetTop + + $('#left-charts-top')[0].offsetHeight
            }
        };
        leftChartsBottomArea = {
            'x': {
                'min': $('#left-charts-bottom')[0].offsetLeft,
                'max': $('#left-charts-bottom')[0].offsetLeft + $('#left-charts-bottom')[0].offsetWidth
            },
            'y': {
                'min': $('#left-charts-bottom')[0].offsetTop,
                'max': $('#left-charts-bottom')[0].offsetTop + + $('#left-charts-bottom')[0].offsetHeight
            }
        };
        Highcharts.Chart.prototype.callbacks.push(function (chart) {
            H.addEvent(chart.container, 'mousedown touchstart', function (e) {
                dragPoint = chart.hoverPoint;
                //console.log('dragPoint' + dragPoint.keywords);   //获取单击点的点属性
                options = dragPoint.series.options; //得到的是单击点所处簇的所有信息
                //console.log('options: ' + options);
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
