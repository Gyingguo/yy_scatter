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

    var svgElement = null;
    var gRowElement = null;
    var gColumnElement = null;
    var gMainElement = null;
    var gTooltipElement = null;

    var _svgId = 'gyy-matrix';
    var _gRowId = 'matrix-row-keywords';
    var _gColumnId = 'matrix-column-keywords';
    var _gMainId = 'matrix-main-area';
    var _gTooltipId = 'matrix-tooltip';

    var svgClientWidth = null;
    var svgClientHeight = null;

    var xAxisPos = {
        x: 0,
        y: 0,
        step: 0
    };
    var yAxisPos = {
        x: 0,
        y: 0,
        step: 0
    };
    var rectPos =  {
        x: 0,
        y: 0,
        stepX:0,
        stepY: 0,
        width: 0,
        height: 0
    };

    function layoutInit(length) {  //根据要显示的关键词数量和当前svg的长宽进行布局的总体分布
        //横坐标的分布
        xAxisPos.step = (svgClientWidth - 80) / (length + 1);
        xAxisPos.x = 40 + xAxisPos.step;
        xAxisPos.y = 40;
        //纵坐标的分布
        yAxisPos.step = (svgClientHeight - 60) / length;
        yAxisPos.x = 40;
        yAxisPos.y = 40 + yAxisPos.step;
        //矩阵分布
        rectPos.stepX = (svgClientWidth - 80) / (length + 1);
        rectPos.stepY = (svgClientHeight - 60) / length;
        rectPos.x =  xAxisPos.x - xAxisPos.step / 10;
        rectPos.y = 40 + yAxisPos.step / 2;
        rectPos.width = rectPos.stepX - 1;
        rectPos.height = rectPos.stepY - 1;
    }

    function randomColors(numberOfColors) {
        var colors = [];
        var step = Math.floor(360 / 36);
        for (var i = 0; i < numberOfColors; i++) {
            colors.push('hsla(' + i * step + ', 100%, 50%, 0.8)');
        }
        return colors;
    }

    function makeSVG(tag, attrs) {  //创建svg对象
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }

    function createTextNode(pos, content, param) {   //创建文本节点
        var text = makeSVG("text",{x: pos.x, y: pos.y, style: param.style});
        text.appendChild(document.createTextNode(content));
        return text;
    }

    function createALink(href) {  //创造一个链接节点,注意在这里给设置节点和属性时必须指定命名空间
        var a = document.createElementNS('http://www.w3.org/2000/svg','a');
        a.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href',
            href);
        return a;
    }

    function createRect(pos, params) { // style: 'fill:lightgrey' 创建一个矩形节点
        var rect= makeSVG('rect', {x: pos.x, y: pos.y, width: pos.width, height: pos.height, id: params.id, style: params.style});
        return rect;
    }

    function createxAxis(xData) {
        var len = null;
        if(xData.length > 10) {
            len = 10;
        } else {
            len = xData.length;
        }
        for(var i = 0; i < len; i++) {
            //var href = shareParams.shareParams._keyword_url + xData[i].trim();
            //var content = xData[i].trim();
            var href = "http://www.baidu.com";
            var aNode = createALink(href);
            var fillStyle = "font-size: 10px;fill:" + defaultOptions.colors[i*len - i];
            var textNode = createTextNode(xAxisPos, '计算机', {style: fillStyle});
            $(aNode).append(textNode);
            document.getElementById(_gRowId).appendChild(aNode);
            xAxisPos.x = xAxisPos.x + xAxisPos.step;
        }
    }

    function createyAxis(yData) {
        var len = null;
        if(yData.length > 10) {
            len = 10;
        } else {
            len = yData.length;
        }
        for(var i = 0; i < len; i++) {
            //var href = shareParams.shareParams._keyword_url + xData[i].trim();
            //var content = xData[i].trim();
            var href = "http://www.baidu.com";
            var aNode = createALink(href);
            var fillStyle = "font-size: 10px;fill:" + defaultOptions.colors[i*len - i];
            var textNode = createTextNode(yAxisPos, '计算机', {style: fillStyle});
            $(aNode).append(textNode);
            document.getElementById(_gColumnId).appendChild(aNode);
            yAxisPos.y = yAxisPos.y + yAxisPos.step;
        }
    }

    function createMain(data) {
        var len = null;
        if(data.keywordsArray.length > 10) {
            len = 10;
        } else {
            len = data.keywordsArray.length;
        }
        var xStart = null;
        var yStart = null;
        xStart = rectPos.x;     //记录最开始的点
        yStart = rectPos.y;
        for(var i = 0,k = 0; i < len; i++) {
            //var href = shareParams.shareParams._keyword_url + xData[i].trim();
            //var count = data.dataJSON.patentsArray[i].count.trim();
            rectPos.x = xStart + i * rectPos.stepX;
            rectPos.y = yStart + i * rectPos.stepY;
            for(var j = i; j < len; j++) {
                var fillStyle = 'fill:' + defaultOptions.colors[k++];
                var rectNode = createRect(rectPos, {style: fillStyle});
                document.getElementById(_gMainId).appendChild(rectNode);
                rectPos.x = rectPos.x + rectPos.stepX;
            }
        }
    }

    function createTooltip(data) {

    }

    function drawMatrix(data) {
        var len = data.dataJSON.keywordsArray.length > 10 ? 10 : data.dataJSON.keywordsArray.length;
        layoutInit(len);

        xAxisHTML = createxAxis(data.dataJSON.keywordsArray);
        yAxisHTML = createyAxis(data.dataJSON.keywordsArray);
        mainHTML = createMain(data.dataJSON);
        gTooltipElement = createTooltip(data.dataJSON);
        //添加交互事件
        addEvent();
    }

    function addEvent() {
        //添加交互事件
    }
    exports.matrix = function(options) {
        defaultOptions.colors = randomColors(100);
        options = $.extend(defaultOptions, options);
        _svgId = options.id + '-' + _svgId;
        _gRowId = options.id + '-' + _gRowId;
        _gColumnId = options.id + '-' + _gColumnId;
        _gMainId = options.id + '-' + _gMainId;
        _gTooltipId = options.id + '-' + _gTooltipId;

        var id = '#' + options.id;
        container = $(id);    //容器
        svgElement = makeSVG('svg', {id: _svgId, width: '100%', height: '100%', style: 'background: black;'});

        gRowElement = makeSVG('g', {id: _gRowId});
        gColumnElement = makeSVG('g', {id: _gColumnId});
        gMainElement = makeSVG('g', {id: _gMainId});
        gTooltipElement = makeSVG('g', {id: _gTooltipId});

        svgElement.appendChild(gRowElement);
        svgElement.appendChild(gColumnElement);
        svgElement.appendChild(gMainElement);
        svgElement.appendChild(gTooltipElement);

        document.getElementById(options.id).appendChild(svgElement);

        svgClientWidth = svgElement.clientWidth;
        svgClientHeight = svgElement.clientHeight;

        drawMatrix(options);
    }
})
