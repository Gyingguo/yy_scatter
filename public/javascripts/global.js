/**
 * Created by carol on 2015/3/31.
 */
define(function(require, exports, module) {
    var scatter = require('../javascripts/scatterExtend');

    exports.global = {
        init: function() {
            //定义一些全局变量
            window._scatterChart = new Highcharts.Chart({
                chart: {
                    renderTo: 'scatter-chart',
                    type: 'scatter',
                    height: 600,
                    spacingLeft: 300,
                    spacingRight: 300,
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
                        point: {
                            events: scatter.scatterExtend
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
                    title: {text: 'x'},
                    gridLineWidth: 1
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
        }
    }
})