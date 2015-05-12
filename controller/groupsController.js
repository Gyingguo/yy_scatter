var url = require('url');
var fs = require('fs');

module.exports = function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var pathnameArray = pathname.split(/\//);
    var groupId = pathnameArray[pathnameArray.length - 1];
    var _filePath = __dirname.replace('controller', 'mock') + '\/' + groupId + '.json';
    fs.readFile(_filePath, function (err, data) {
        if (err) throw err;
        res.send(data);
    });
}