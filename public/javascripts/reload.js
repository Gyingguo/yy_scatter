define(function(require,exports,module) {
    var cachedGroups = {};
    var render = require("../javascripts/render");

    exports.reload = function() {
        var groupId = location.hash.replace('#!', '') || '0';
        var cache = cachedGroups[groupId];

        if (cache) return render.render(cache);
        $.get('/api/groups/' + groupId, render.render);
    };
});