define(function(require,exports,module) {
    exports.reload = function() {
        var groupId = location.hash.replace('#!', '') || '0';
        console.log(groupId);
    };
});