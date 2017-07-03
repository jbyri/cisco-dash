var express = require('express');
var app     = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/src')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/src/index.html')
})

app.set('port', (process.env.PORT || 5000));
//For avoidong Heroku $PORT error
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
