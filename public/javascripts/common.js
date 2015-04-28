define(function(require, exports, module) {
    exports.common = {
        /*isOwnEmpty: function(obj){
            for(var name in obj)
            {
                if(obj.hasOwnProperty(name))
                {
                    return false;
                }
            }
            return true;
        }*/
        randomColors: function(numberOfColors) {
            var colors = [];
            var step = Math.floor(360 / numberOfColors);
            for (var i = 0; i < numberOfColors; i++) {
                colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)');
            }
            return colors;
        }
    }
})
