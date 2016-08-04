var path = require('path');
var express = require('express');
var ghost = require('ghost');

var parentApp = express();

parentApp.get('/.well-known/acme-challenge/GN73o_Q7d3koJOyMcOxP3oz128ZqvgZ14H8Z24r3FxA',
function(req, res){
    res.send('GN73o_Q7d3koJOyMcOxP3oz128ZqvgZ14H8Z24r3FxA.0RmUU7AYU_7lWGQdLbKSHkrZMVTb-vTbz5e2BDeZ7K4');
});

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(parentApp);
});
