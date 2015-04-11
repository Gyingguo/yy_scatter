/**
 * Created by carol on 2015/3/26.
 */
define(function(require, exports, module) {
    var matrix = require('../javascripts/matrix/matrix');

    exports.paintMatrixChart = function(data, posObj) {
        var targetId = posObj.id;
        matrix.matrix({id: targetId,dataJSON: data});
    }
})
