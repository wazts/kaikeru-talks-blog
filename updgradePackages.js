var exec = require('child_process').exec;
var cmd = 'npm install --save ';

// Get file
var fs = require('fs');
var obj;
fs.readFile('package.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    var dep = obj["dependencies"];
    for(var key in dep){
        exec(cmd + key, function(error, stdout, stderr) {
            // command output is in stdout
            if(stderr){
                console.error(stderr);
            }
            if(stdout){
                console.log(stdout);
            }
            if(error){
                console.error(error);
            }
        });
    }
});
