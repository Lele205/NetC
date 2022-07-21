const prompt = require('prompt-sync')();
const http = require('http');
const fs = require('fs');
const chalk = require("chalk");
const path = require('path');

module.exports = 
{
    LoadInterface: function(file)
    {
        var p = path.join(__dirname, "../");
        p = path.join(p, file);
        start = "java --module-path ./java/javafx/lib --add-modules javafx.controls,javafx.fxml --add-modules javafx.web -jar ./java/runnable/try.jar " + p;
        require('child_process').exec(start);
    },

    StartServer: async function(file)
    {
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
            console.log(chalk.green("SERVER STARTED AT:  http://localhost:8000"));
            require('child_process').exec(start + ' ' + url);
        }
        await load(file);

    }
}