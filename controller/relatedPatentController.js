var url = require('url');
var http = require('http');

module.exports = function(req, res) {
    var parentReq = req;
    var parentRes = res;

    var pathname = url.parse(req.url).path;
    var pathnameArray = pathname.split('?keyword=');
    var keyword = pathnameArray[1];
    var data = {
        "keyword": decodeURI(keyword),
        "content": ''
    };
    //向另外一台服务器发出请求
    var opt = {
        host:'222.201.145.184',
        port:'50000',
        method:'GET',//这里是发送的方法
        path:'http://scut-ai-lab.tk:50000/api/patents?q=' + keyword,     //这里是访问的路径
        headers:{
            //这里放期望发送出去的请求头
            'content-type': 'text/plain'
        }
    }
    //以下是接受数据的代码

    var req = http.request(opt, function(res) {
        res.on('data',function(d){
            data.content += d;
        }).on('end', function(){
            data.content = JSON.parse(data.content);
            parentRes.render('relative_patent', data);
        });

    }).on('error', function(e) {
        console.log("Got error:");
    })
    req.end();
}