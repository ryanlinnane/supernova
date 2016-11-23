var express = require('express');
var app = express();
var path = require('path');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//set static content:
app.use(express.static('public'));
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,"index.html"));
});

var server = app.listen(port,ipaddress, function () {

  console.log('Example app listening at http://%s:%s', ipaddress, port);
});
