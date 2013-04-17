
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var moment = require('moment');
var mongoose = require('mongoose');


// the ExpressJS App
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

  // server port number
  app.set('port', process.env.PORT || 5000);

  //  templates directory to 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());


  //cookies stuff
  //pass secret key to cookieParser() for signed cookies
  app.use(express.cookieParser('0984390842sadlkjsDLOJS9IUEWQWQRPLJLKJAASDQWE'));
  app.use(express.cookieSession()); // add req.sessoin cookies

  // make sesh info available to templates
  // keeping track of what they've voted for
  app.use(function(req,res,next){
    res.locals.sessionVotedFor = req.session.votedFor;
    next();
  });

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // database - skipping until week 5
  app.db = mongoose.connect(process.env.MONGOLAB_URI);

  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// ROUTES
var routes = require('./routes/index.js');
app.get('/', routes.view);  
app.get('/add', routes.add);
app.post('/add', routes.postClass);
app.get('/classes/:slug/edit', routes.seeAyes);
app.post('/classes/:slug/edit', routes.addAye);
app.post('/session/votes', routes.setSession);


// create NodeJS HTTP server using 'app'

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
