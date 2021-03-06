/**
 * Created by carol on 2015/3/31.
 * //定义一些全局变量
 */
define(function(require, exports, module) {
    var shareParams = require('../shareParams');

    exports.scatterSetting = {
        init: function(chart) {
            $.extend(chart,
                {
                    chart: {
                        renderTo: 'scatter-chart',
                        type: 'scatter',
                        height: 500,
                        spacingRight: 100,
                        backgroundColor: 'black',
                        options3d: {
                            enabled: true,
                            alpha: 5,
                            beta: 45,
                            depth: 400,
                            viewDistance: 5,
                            frame: {
                                bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                                back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                                side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                            }
                        }
                    },
                    title: {
                        text: '专利分布'
                    },
                    tooltop: {
                        useHTML: true
                    },
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                }
            )
            shareParams.shareParams._current_scater_chart = chart;
            shareParams.shareParams._pm = {
                _param: 1.2,    //缩放系数，可以在此配置
                _plus: 1,
                _minus: -1,
                _flag: 1,       //1表示按键为plus放大，-1表示按键为minus缩小,0表示取消单击放大缩小的功能
                /*
                 累计缩放次数，实时判断缩放比例，
                 -2表示缩小，坐标轴范围*_param,
                 2表示放大，各个坐标轴范围/_param
                 */
                _plusMinusCount: 0
            }
        },
        update: function(params) {  //更新_default_scatter_chart数据
            $.extend(shareParams.shareParams._current_scater_chart, params);
        }
    }
})