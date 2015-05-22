//var data = require('../mock/data.js');
var data = {};

module.exports = function(req, res) {
    res.render('main', data);
}
