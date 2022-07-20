const prompt = require('prompt-sync')();
const http = require('http');
const fs = require('fs');
const chalk = require("chalk");

module.exports = 
{
    LoadInterface: function(file)
    {
        
    },

    StartServer: async function(file)
    {
        console.log(chalk.green("SERVER STARTED AT:  http://localhost:8000"));
        async function load(file)
        {
            http.createServer(function(req, res){
                fs.readFile(file, function (err, data){
                    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
                    res.write(data);
                    res.end();
                });
            }).listen(8000);
            var url = 'http://localhost:8000';
            var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
            require('child_process').exec(start + ' ' + url);
        }
        await load(file);

    }
}