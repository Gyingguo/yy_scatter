/**
 * Created by carol on 2015/3/31.
 */
define(function(require, exports, module) {
    var scatter = require('../javascripts/scatterExtend');
    var shareParams = require('../javascripts/shareParams');

    exports.global = {
        init: function() {
            //定义一些全局变量
            shareParams.shareParams._scatterChart = new Highcharts.Chart({
                chart: {
                    renderTo: 'scatter-chart',
                    type: 'scatter',
                    height: 500,
                    spacingRight: 100,
                    backgroundColor: 'black',
                    options3d: {
                        enabled: true,
                        alpha: 5,
                        beta: 16,
                        depth: 400,
                        viewDistance: 5,
                        frame: {
                            bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                            back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                            side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                        }
                    },
                    events: {
                        afterPrint: scatter.scatterExtend.afterPrint()
                       // click: scatter.scatterExtend.clickChart()
                    }
                },
                title: {
                    text: '专利分布'
                },
                plotOptions: {
                    scatter: {
                        width: 10,
                        height: 10,
                        depth: 10
                    },
                    series: {
                        events: {
                            mouseOver: scatter.scatterExtend.mouseOver,
                            mouseOut: scatter.scatterExtend.mouseOut,
                            drag: scatter.scatterExtend.drag(),
                            drop: scatter.scatterExtend.drop
                        }
                    }
                },
                yAxis: {
                    min: -1,
                    max: 1,
                    title: {text: 'y'}
                },
                xAxis: {
                    min: -1,
                    max: 1,
                    title: {text: 'x'}
                },
                zAxis: {
                    min: -1,
                    max: 1,
                    title: {text: 'z'}
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
            })
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

        }
    }
})