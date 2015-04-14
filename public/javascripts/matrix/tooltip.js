/**
 * Created by carol on 2015/4/14.
 *//*

define(function(require, exports, module) {
    var Common = {
        getItself: function(id) {
            return "string" == typeof id ? document.getElementById(id) : id;
        },
        getEvent: function() {
            if(document.all) {
                return window.event;
            } else {
                func = getEvent.caller;
                return func.arguments[0].event;
            }
        },
        getMousePos: function(ev) {
            if(!ev) {
                ev = this.getEvent();
            }
            if(ev.pageX || ev.pageY) {
                return {
                    x: ev.pageX,
                    y: ev.pageY
                };
            }
            if(document.documentElement && document.documentElement.scrollTop) {
                return {
                    x: ev.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,
                    y: ev.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
                };
            }else (document.body) {
                return {
                    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                    y: ev.clientY + document.body.scrollTop - document.body.clientTop
                };
            }
        },
        getElementPos: function(el) {
            el = this.getItself(el);
            var _x = 0, _y = 0;
            do {
                _x += el.offsetLeft;
                _y += el.offsetTop;
            } while (el = el.offsetParent);
            return { x: _x, y: _y };
        },
        getTextSize: function(text) {
            var span = document.createElement("span");
            var result = {};
            result.width = span.offsetWidth;
            result.height = span.offsetWidth;
            span.style.visibility = "hidden";
            document.body.appendChild(span);
            if (typeof span.textContent != "undefined")
                span.textContent = text;
            else span.innerText = text;
            result.width = span.offsetWidth - result.width;
            result.height = span.offsetHeight - result.height;
            span.parentNode.removeChild(span);
            return result;
        }
    };

    var Tooltip = {

    }
    exports.tooltip = function(tooltipData,evt) {

    }
})
*/
