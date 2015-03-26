define(function(require,exports,module) {
    var cachedGroups = {};
    var scatterChart = null;

    var render = require("../javascripts/render");

    exports.reload = function() {
        var groupId = location.hash.replace('#!', '') || '0';

        var cache = cachedGroups[groupId];

        if (cache) return render.render(cache);

        //scatterChart.showLoading('努力加载中...');

        $.get('/api/groups/' + groupId, render.render);
    };
});