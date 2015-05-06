/**
 * Created by carol on 2015/4/1.
 * 定义一些共享通信变量，shareParams和global同时存在是为了克服循环引用问题
 */
define(function(require, exports, module) {

    exports.shareParams = {
        "_url": "http://scut-ai-lab.tk:50000/api/groups/",
        "_patent_url": "http://scut-ai-lab.tk:50000/api/patents?",
        "_keyword_url": "http://scut-ai-lab.tk:50000/#!/",
        "_keyword_year_trend_url": "http://222.201.145.184:8800/zhuanli/tech_analyze.do?key=",
        "_default_scatter_chart": {
            yAxis: {
                min: -1,
                max: 1,
                startOnTick: false,
                endOnTick: false,
                title: {text: 'y'}
            },
            xAxis: {
                min: -1,
                max: 1,
                startOnTick: false,
                endOnTick: false,
                title: {text: 'x'}
            },
            zAxis: {
                min: -1,
                 max: 1,
                title: {text: 'z'}
            }
        },
        "_current_scater_chart": {

        },
        "_scatterChart": null,
        "_pm": null,
        "_scatter_data_json": null,
        "_main_menu_choice": {
           "plus":  0,
           "minus": 1,
           "single_point_drag": 2,
           "set_point_drag": 3,
           "all_point_drag": 4,
            "rotate": 5
        },
        "_current_menu_choice": 0,
        "_dragChartType": {
            "pie-chart": 1,
            "column-chart": 2,
            "matrix-chart": 3
        }
    }
})
