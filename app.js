var express = require('express');
var app     = express();
var path = require('path');
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/client/src')));
app.use('/node_modules/tether/dist/css/',express.static(path.join(__dirname,'/node_modules/node_modules/tether/dist/css/')));
//For avoidong Heroku $PORT error
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});