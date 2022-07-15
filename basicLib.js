var http = require('http');
var fs = require('fs');

module.exports = 
{
    LoadInterface: function(file)
    {
        http.createServer(function(req, res){
            fs.readFile(file,function (err, data){
                res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
                res.write(data);
                res.end();
            });
        }).listen(8000);
        var url = 'http://localhost:8000';
        var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
        require('child_process').exec(start + ' ' + url);
    },
}