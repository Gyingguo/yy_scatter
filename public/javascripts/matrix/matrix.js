/**
 * Created by carol on 2015/4/11.
 */
define(function(require, exports, module) {
   var defaultOptions = {
       id: 'matrix',
       colors: [],
       chart: {
           borderColor: ''

       },
       title: {
           text: '矩阵关系图',
           align: 'center'
       },
       tooltip: {
           backgroundColor: 'rgba(249, 249, 249, 0.85)',
           headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
           pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
       }
   }

    exports.matrix = function(options) {
        options = $.extend(defaultOptions, options);

        console.log('default: ' + options.dataJSON.keywordsArray);
    }
})
