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
    var svgElement = null;
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

    function makeSVG(tag, attrs) {
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }





    function createTextNode(pos, content) {   //创建文本节点
        //创造一个文本节点对象
        var text = null;
        //var text = makeSVG('text', {id: 'textTest', width: '10', height: '10', color: 'red'})
       /* var text = document.createElement ("text");
        text.setAttribute("x", pos.x);
        text.setAttribute("y", pos.y);*/
        //将文本内容添加到text节点对象中
        /*text.appendChild(document.createTextNode(content));*/
        return text;
    }

    function createALink(href, size) {  //创造一个链接节点,注意在这里给设置节点和属性时必须指定命名空间
        var a = document.createElementNS('http://www.w3.org/2000/svg','a');

        a.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href',
            'http://www.baidu.com');
        document.getElementById('gyy-matrix').appendChild(a);
        var rect= makeSVG('rect', {id: 'rect', x: '10', y: '10', width: '100', height: '30',rx: '10', ry: '10', style: 'fill:lightgrey'});
        //var text = makeSVG('text', {color: 'green', x: '10', y: '40'});

        //a.appendChild(rect);

        //创造一个文本节点对象
        var text = makeSVG("text",{x: '30', y: '30', style: 'font-size: 14px'});
        /*text.setAttribute("x", 100);
        text.setAttribute("y", 100);
        text.setAttribute('font-size', 15);
        text.setAttribute('width', 20);
        text.setAttribute('height', 20);*/
        //将文本内容添加到text节点对象中
        text.appendChild(document.createTextNode("技术要点"));
        a.appendChild(text);

        //text.firstChild.setData('计算机');
        /*var a = document.createElementNS("http://www.w3.org/2000/svg","a");
        a.setAttributeNS(
            "xlink:href",
            "http://www.baidu.com/");*/
        return a;
        //将text节点添加到链接节点中
       // a.appendChild(text);
    }

    function createRect(pos, size) { //创建一个矩形节点
        var shape = document.createElement("rect ");
        //配置属性
        shape.setAttribute("x", pos.x);
        shape.setAttribute("y", pos.y);
        shape.setAttribute("width",  size.width);
        shape.setAttribute("height",   size.height);
        shape.setAttribute("style", "fill: #eeeeee");
        shape.getStyle().setProperty("stroke","red");
        shape.getStyle().setProperty("stroke-width","1");
        return shape;
    }

    function createxAxis(xData) {
        var pos = {
            x: 10,
            y: 40
        };
        var tagHTML = "";
        for(var i = 0; i < xData.length; i++) {
            var href = shareParams.shareParams._keyword_url + xData[i].trim();
            var content = xData[i].trim();
            var aNode = createALink(href,'{width: 100px, height: 100px}');
            var textNode = createTextNode(pos, content);
            $(aNode).append(textNode);
            document.getElementById('gyy-matrix').appendChild(aNode);
            console.log(gRowElement);
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

        //$(_gRowId)[0].innerHTML = xAxisHTML;
       // console.log($(_gRowId)[0].innerHTML);
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
        svgElement = makeSVG('svg', {id: 'gyy-matrix', width: '200', height: '200', color: 'red'});
        document.getElementById(options.id).appendChild(svgElement);
        //$(svgElement).append(gRowElement);
         /*$(_svgId).append(gColumnElement);
         $(_svgId).append(gMainElement);
         $(_svgId).append(gTooltipElement);*/
        drawMatrix(options);
        //console.log('default: ' + options.dataJSON.keywordsArray);
    }
})
