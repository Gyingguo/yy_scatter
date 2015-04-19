/**
 * Created by carol on 2015/3/30.
 */
define(function(require, exports, module) {
    var shareParams = require("../shareParams");
    var plusMinusScatter = require('../scatter/plusMinusScatter');
    var draggableScatter = require("../scatter/draggableScatter");

    exports.scatterExtend = {
        clickChart: function() {   //单击图表非节点区域
            plusMinusScatter.plusMinusScatter(Highcharts);    //绑定鼠标单击事件放大事件
        },
        clickPoint: function() {  //刚好点击到节点
            plusMinusScatter.plusMinusScatter(Highcharts);
        },
        mouseOver: function() {
           // console.log("mouseover " + JSON.stringify(this.options));
            /*var targetGroupId = this.options.group_id;
            var oldColor = this.series.color;
            var groupPoints = util.util.sameGroupIdPoint(targetGroupId);
            console.log(groupPoints)
            groupPoints.color = 'black';
            console.log(this);
            this.series.color = "white";
            console.log(groupPoints.color);
            console.log(this.series.color);*/
            //console.log("moveover");
        },
        mouseOut: function() {

        },
        afterPrint: function() {
            //console.log("afterAnimation" + $('#plus').html());
           /* var plus = $('#plus');
            var minus = $('#minus');

            plus.click(function() {
                if (plus.hasClass('chosen')) {
                    plus.removeClass('chosen');  //取消缩放效果
                    shareParams.shareParams._pm.flag = 0;
                } else {
                    minus.removeClass('chosen');
                    plus.addClass('chosen');
                    shareParams.shareParams._pm._flag = 1;     //表示放大
                }
            })

            minus.click(function() {
                if (minus.hasClass('chosen')) {
                    minus.removeClass('chosen');
                    shareParams.shareParams._pm.flag = 0;   //取消缩放效果
                } else {
                    plus.removeClass('chosen');
                    minus.addClass('chosen');
                    shareParams.shareParams._pm._flag = -1;    //表示缩小
                }
            })*/
        },

        drag: function() {
            draggableScatter.draggableScatter(Highcharts);
        },
        drop: function() {

        }
    };

})