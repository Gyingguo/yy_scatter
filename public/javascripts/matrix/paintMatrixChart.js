/**
 * Created by carol on 2015/3/26.
 */
define(function(require, exports, module) {
    var matrix = require('../matrix/matrix');

    exports.paintMatrixChart = function(data, posObj) {
        var targetId = posObj.id;
        var svgId = targetId + '-gyy-matrix';
        if(document.getElementById(svgId)) { //清空
            document.getElementById(targetId).removeChild(document.getElementById(svgId));
        }
        matrix.matrix({id: targetId,dataJSON: data});
    }
})
