/**
 * Created by carol on 2015/4/1.
 */
define(function(require, exports, module) {

    exports.shareParams = {
        _scatterChart: null,
        _pm: null,
        _dragChartType: {   //标识左侧拖曳计算的支持图形类型
            "pieChart": 1,
            "columnChart": 1,
            "lineChart": 0,
            "isPieDraw": [0,0],
            "isColumnDraw": [0,0],
            "isLineDraw": [0,0]
        }
    }
})
