/**
 * Created by carol on 2015/4/11.
 */
define(function(require, exports, module) {
   var shareParams = require("../shareParams");

   var defaultOptions = {
       id: 'matrix',
       colors: [],
       chart: {
           borderColor: ''

       },
       title: {
           text: '矩阵关系图',
           align: 'center'
       },
       tooltip: {
           backgroundColor: 'rgba(249, 249, 249, 0.85)',
           headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
           pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
       }
   }
    var container = null;
    var xAxisHTML = null;
    var yAxisHTML = null;
    var mainHTML = null;
    var tooltipHTML = null;

    var svgNS = " http://www.w3.org/2000/svg";
    var svgElement = document.createElementNS(svgNS, 'svg');
    svgElement.setAttribute('id', 'gyy-matrix');
    var gRowElement = document.createElementNS(svgNS, 'g');
    gRowElement.setAttribute('id', 'matrix-row-keywords');
    var gColumnElement = document.createElementNS(svgNS, 'g');
    gColumnElement.setAttribute('id', 'matrix-column-keywords');
    var gMainElement = document.createElementNS(svgNS, 'g');
    gMainElement.setAttribute('id', 'matrix-main-area');
    var gTooltipElement = document.createElementNS(svgNS, 'g');
    gTooltipElement.setAttribute('id', 'matrix-tooltip');

    var _svgId = '#gyy-matrix';
    var _gRowId = '#matrix-row-keywords';
    var _gColumnId = '#matrix-column-keywords';
    var gMainId = '#matrix-main-area';
    var gTooltipId = '#matrix-tooltip';

    function createxAxis(xData) {

        var pos = {
            x: 10,
            y: 40
        };
        var tagHTML = "";
        for(var i = 0; i < xData.length; i++) {
            var xLink = shareParams.shareParams._keyword_url + xData[i].trim();
            var tag = '<a xlink:href="'+ 'http://www.baidu.com' + '" target="_blank" height="100px" width="100px">' +
                      '<text x="' + pos.x + '" y="' + pos.y + '" font-size="14">' + xData[i] + '</text>'+
                      '</a>';
            tagHTML = tagHTML + tag;
            pos.y = pos.y + 10;
        }
        /*$(gElement).append(tagHTML);
        $(svgElement).append(gElement);

        console.log('tagHTML' + $(gElement).innerHTML);*/

        return tagHTML;
    }

    function createyAxis(yData) {

    }

    function createMain(data) {

    }

    function createTooltip(data) {

    }

    function drawMatrix(data) {
        xAxisHTML = createxAxis(data.dataJSON.keywordsArray);

        var allHTML = xAxisHTML + yAxisHTML + mainHTML + tooltipHTML;

        $(_gRowId)[0].innerHTML = xAxisHTML;
        console.log($(_gRowId)[0].innerHTML);
        //添加交互事件
        addEvent();
    }

    function addEvent() {
        //添加交互事件
    }
    exports.matrix = function(options) {
        options = $.extend(defaultOptions, options);
        var id = '#' + options.id;
        container = $(id);    //容器
        container.append(svgElement);
        $(_svgId).append(gRowElement);
        $(_svgId).append(gColumnElement);
        $(_svgId).append(gMainElement);
        $(_svgId).append(gTooltipElement);
        drawMatrix(options);
        //console.log('default: ' + options.dataJSON.keywordsArray);
    }
})
