/**
 * Created by carol on 2015/4/1.
 */
define(function(require, exports, module) {

    exports.shareParams = {
        "_scatterChart": null,
        "_pm": null,
        "_scatter_data_json": null,
        "_dragChartType": [
            {
                "id": "#pie-chart",
                "chartType": "pie",
                "flag": 1
            },
            {
                "id": "#column-chart",
                "chartType": "column",
                "flag": 2
            },
            {
                "id": "#line-chart",
                "chartType": "line",
                "flag": 3
            }
        ]
    }
})
