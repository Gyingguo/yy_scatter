define(function(require, exports, module) {
    exports.util = {
        isOwnEmpty: function(obj){
            for(var name in obj)
            {
                if(obj.hasOwnProperty(name))
                {
                    return false;
                }
            }
            return true;
        }
    }
})
