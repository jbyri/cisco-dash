var express = require('express');
var app     = express();
var path = require('path');
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/client/src')));
app.use('/node_modules', express.static(__dirname + '/app/node_modules'));
//For avoidong Heroku $PORT error
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});