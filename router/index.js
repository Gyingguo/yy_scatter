
/*
 * GET home page.
 */
var controller = require('../controller');

exports.init = function(app) {
    app.get('/', controller.main);
    app.get('/api/groups/*', controller.groups);
};