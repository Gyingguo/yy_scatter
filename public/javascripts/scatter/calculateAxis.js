define(function(require, exports, module) {
    var shareParams = require('../shareParams');
    exports.calculateAxis = {
        plus: function(centerX ,centerY) {
            var yPlusMin = null;
            var yPlusMax = null;
            var xPlusMin = null;
            var xPlusMax = null;
            var zPlusMin = null;
            var zPlusMax = null;
            shareParams.shareParams._pm._plusMinusCount++;
            yPlusMin = -1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            yPlusMax = 1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            xPlusMin = -1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            xPlusMax = 1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            zPlusMin = -1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            zPlusMax = 1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            return {
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
                yAxis: {
                    min: yPlusMin,
                    max: yPlusMax,
                    title: {text: 'y'}
                },
                xAxis: {
                    min: xPlusMin,
                    max: xPlusMax,
                    title: {text: 'x'}
                },
                zAxis: {
                    min: zPlusMin,
                    max: zPlusMax,
                    title: {text: 'z'}
                }
            };
        },
        minus: function() {
            var yMinusMin = null;
            var yMinusMax = null;
            var xMinusMin = null;
            var xMinusMax = null;
            var zMinusMin = null;
            var zMinusMax = null;
            shareParams.shareParams._pm._plusMinusCount--;
            yMinusMin =  -1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            yMinusMax = 1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            xMinusMin = -1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            xMinusMax= 1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            zMinusMin = -1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            zMinusMax = 1 / Math.pow(shareParams.shareParams._pm._param, shareParams.shareParams._pm._plusMinusCount);
            return {
                yAxis: {
                    min: yMinusMin,
                    max: yMinusMax,
                    title: {text: 'y'},
                    allowDecimals:true
                },
                xAxis: {
                    min: xMinusMin,
                    max: xMinusMax,
                    title: {text: 'x'}
                },
                zAxis: {
                    min: zMinusMin,
                    max: zMinusMax,
                    title: {text: 'z'}
                }
            };
        }
    }
})