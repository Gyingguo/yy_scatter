/**
 * Created by carol on 2015/3/30.
 */
define(function(require, exports, module) {
    var util = require('../javascripts/util');
    exports.scatterExtend = {
        click: function() {
            //alert("click" + JSON.stringify(this.options));
        },
        mouseOver: function() {
            var targetGroupId = this.options.group_id;
            var oldColor = this.series.color;
            var groupPoints = util.util.sameGroupIdPoint(targetGroupId);
            console.log(groupPoints)
            groupPoints.color = 'black';
            console.log(this);
            //this.series.color = "white";
            console.log(groupPoints.color);
            console.log(this.series.color);
        },
        mouseOut: function() {

        }
    };

})