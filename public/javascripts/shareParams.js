/**
 * Created by carol on 2015/4/1.
 */
define(function(require, exports, module) {

    exports.shareParams = {
        "_scatterChart": null,
        "_pm": null,
        "_scatter_data_json": null,
        "_main_menu_choice": {
           "plus":  0,
           "minus": 1,
           "single_point_drag": 2,
           "set_point_drag": 3
        },
        "_current_menu_choice": 0,
        "_dragChartType": {
            "pie-chart": 1,
            "column-chart": 2,
            "line-chart": 3
        }
    }
})
