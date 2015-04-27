define(function(require,exports,module) {
    var shareParams = require('../javascripts/shareParams');
    var cachedGroups = {};
    var render = require("../javascripts/render");

    exports.reload = function() {
        var groupId = location.hash.replace('#!/', '') || '0';
        var cache = cachedGroups[groupId];

        if (cache) return render.render(cache);
        //连接远程接口
        var url = shareParams.shareParams._url + groupId;
        $.get(url, render.render);
        //$.get('/api/groups/' + groupId, render.render);
    };
});