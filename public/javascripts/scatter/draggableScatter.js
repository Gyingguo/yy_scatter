/**
 * Created by carol on 2015/4/2.
 */
define(function(require, exports, module) {
    var shareParams = require('../shareParams');
    var paintPieChart = require('../pie/paintPieChart');
    var paintColumnChart = require('../column/paintColumnChart');
    var paintMatrixChart = require('../matrix/paintMatrixChart');

    var flag = 0;
    var dragPoint = null;
    var options = null;
    var upPosition = 0;

    var leftChartsTopArea = null;
    var leftChartsBottomArea = null;

    var currentObj = null;    //当前有效的区域的节点

    function isTopOrBottom(targetPoint) {
        ///判断落在哪个区域了,/从shareParams的_dragChartType中判断，获得当前页面拥有的
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

    function searchByKeywords(arr) { //两两关键词配对，到后台搜索keywords中同时含有这两个关键词的专利信息
        var patent = [];
        var len = arr.length;
        if (len > 10) {   //限制做多为10个
            len = 10;
        }
        $.ajaxSetup({  //设置get为同步
            async : false
        });
        for(var i = 0; i < len; i++) {
            for(var j = i + 1; j < len; j++) {
                var part = 'q=' + arr[i].trim() + '+'+ arr[j].trim();
                var url = shareParams.shareParams._patent_url + part;
                //本地测试
                //var url = '/api/groups/patent';
                $.get(url, function(data) {
                    patent.push(data);
                })
            }
        }
        $.ajaxSetup({
            async : true
        });
        return patent;
    }

    function drawWithDragData() {
        if (upPosition === 1) {
            if(shareParams.shareParams._current_menu_choice === 2) {
                alert("单点拖曳下没有可用于饼图可视化的数据信息！（试试单簇拖曳、簇集拖曳吧！）");
            } else if(shareParams.shareParams._current_menu_choice === 3) {
                //单簇拖曳
                var url = shareParams.shareParams._url + options.id;
                $.get(url,function(data) {
                    var data = JSON.stringify(data);
                    paintPieChart.paintPieChart(data, currentObj);
                });
            } else if(shareParams.shareParams._current_menu_choice === 4) {
                //整簇拖曳
                paintPieChart.paintPieChart(JSON.stringify(shareParams.shareParams._scatter_data_json), currentObj);
            }
        } else if (upPosition === 2) {
           if(shareParams.shareParams._current_menu_choice === 2) {
               alert("单点拖曳下没有可用于条形图可视化的数据信息！（试试单簇拖曳、簇集拖曳吧！）");
            } else if(shareParams.shareParams._current_menu_choice === 3) {
               //单簇拖曳
               var url = shareParams.shareParams._url + options.id;
               $.get(url,function(data) {
                   var data = JSON.stringify(data);
                   paintColumnChart.paintColumnChart(data, currentObj);
               });
            } else if(shareParams.shareParams._current_menu_choice === 4) {
               //整簇拖曳
               paintColumnChart.paintColumnChart(JSON.stringify(shareParams.shareParams._scatter_data_json), currentObj);
           }
        } else if (upPosition === 3) {
            var data = {
                "keywordsArray": null,
                "patentsArray": null
            };
            var keywordsArray = [];
            if(shareParams.shareParams._current_menu_choice === 2) {//单个点的关键词
                keywordsArray = dragPoint.keywords.split(',');
                //获取两两关键词组合的patents信息
                data.keywordsArray = keywordsArray;
                data.patentsArray = searchByKeywords(keywordsArray);
                paintMatrixChart.paintMatrixChart(data, currentObj);
            } else if(shareParams.shareParams._current_menu_choice === 3) {  //单个簇
                var url = shareParams.shareParams._url + dragPoint.group_id;
                $.get(url, function(result) {  //得到该簇的keywords
                    for(var i = 0; i < result.keywords.length; i++) {
                        keywordsArray.push(result.keywords[i].name);
                    }
                    //获取两两关键词组合的patents信息
                    data.keywordsArray = keywordsArray;
                    data.patentsArray = searchByKeywords(keywordsArray);
                    paintMatrixChart.paintMatrixChart(data, currentObj);
                });
            } else {  //散点图中的所有簇
                for(var i = 0; i < shareParams.shareParams._scatter_data_json.keywords.length; i++) {
                    keywordsArray.push(shareParams.shareParams._scatter_data_json.keywords[i].name);
                }
                //获取两两关键词组合的patents信息
                data.keywordsArray = keywordsArray;
                data.patentsArray = searchByKeywords(keywordsArray);
                paintMatrixChart.paintMatrixChart(data, currentObj);
            }
            //获取两两关键词组合的patents信息
            /*data.keywordsArray = keywordsArray;
            data.patentsArray = searchByKeywords(keywordsArray);
            paintMatrixChart.paintMatrixChart(data, currentObj);*/
        } else {
            //
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
                if(shareParams.shareParams._current_menu_choice === 2 ||
                    shareParams.shareParams._current_menu_choice === 3 ||
                    shareParams.shareParams._current_menu_choice === 4) {
                    dragPoint = chart.hoverPoint;
                    //console.log('dragPoint' + dragPoint.keywords);   //获取单击点的点属性
                    options = dragPoint.series.options; //得到的是单击点所处簇的所有信息
                    //console.log('options: ' + options);
                    flag = 1;
                }
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
