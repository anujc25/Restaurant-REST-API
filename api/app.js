var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');  
var mongoose = require('mongoose');
var restaurant = require('./routes/restaurant');

mongoose.connect('mongodb://localhost/anuj_restaurant_api');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});  
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/zappos/api/v1/restaurants', restaurant);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;


  