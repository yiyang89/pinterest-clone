var express = require('express');
var app = express();
var mongowrap = require('./scripts/mongowrap.js');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// SET THIS TO A DB ON MLAB FOR DEPLOYMENT.
var url = process.env.MONGO_ADDRESS;
var mongo;

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Each type of passport plugin will require its specific oauth strategy.
var TwitterStrategy = require('passport-twitter').Strategy;
// Need to create credentials on https://console.developers.google.com/
// MOVE THESE INTO ENV VARIABLES BEFORE DEPLOYING.
var TWITTER_CONSUMER_KEY = process.env.TWITTER_API_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_API_SECRET;
var AUTHHOST = process.env.AUTH_HOST;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: AUTHHOST + '/auth/twitter/callback',
  passReqToCallback   : true
  },
  function(request, token, tokenSecret, profile, done) {
    // Stuff to do after verified.
    // console.log(JSON.stringify(profile));
    // console.log("PROFILE: " + profile);
    // console.log("TOKEN: " + JSON.stringify(token));
    // console.log("TOKEN SECRET: " + JSON.stringify(tokenSecret));
    console.log("A user has logged in");
    // Store data in mongo collection
    // console.log(done);
    mongowrap.saveToken(mongo, token, profile, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        return done(null, [token, profile]);
      }
    })
  }
));

// Serializing is part of session handling
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', function(request, response) {
  response.render('pages/index', {'user':null, 'token':null});
});

app.get('/api/getimages', function(request,response) {
  console.log("In get images API call");
  // Get all images from database and send to front end.
  mongowrap.getimages(mongo, function(err, result) {
    if (err) {
      console.log("Error getting images: " + err);
      response.send({"error":err});
    } else {
      response.send(result);
    }
  })
})

app.get('/api/uploadimage/', function(request, response) {
  // request.query will contain: the link, the description, the username
  console.log("In upload image API call");
  console.log(request.query.address);
  console.log(request.query.description);
  console.log(request.query.username);
  // Format the storage object:
  var storageObject = {
    "postedby": request.query.username,
    "description": request.query.description,
    "link": request.query.address,
    "likes": 0,
    "likeData": []
  }
  mongowrap.uploadimage(mongo, storageObject, function(err, result) {
    if (err) {
      console.log("Error uploading image: "+ err);
      response.send({"error":err});
    } else {
      // Fetch updated image list and return to front.
      mongowrap.getimages(mongo, function(err, result) {
        if (err) {
          console.log("Error getting images: "+ err);
          response.send({"error":err});
        } else {
          response.send(result);
        }
      })
    }
  })
})

app.get('/api/likeimage/', function(request, response) {
  // request.query will contain: the imageid, the username
  console.log("In like image API call");
  console.log(request.query.imageid);
  console.log(request.query.username);
})

app.get('/api/deleteimage/', function(request, response) {
  // request.query will contain: the imageid, the username
  console.log("In delete image API call");
  console.log(request.query.imageid);
  console.log(request.query.username);
})

app.get('/tokendetails/:ACCESSTOKEN', function(request, response) {
  // Query mongodb for profile corresponding to access token.
  mongowrap.getTokenDetails(mongo, request.params.ACCESSTOKEN, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("sending result for tokendetails");
      // console.log(result);
      response.send(result);
    }
  })
})

app.get('/logout/:ACCESSTOKEN', function(request, response) {
  // Delete profile with this access token from mongodb.
  mongowrap.removeToken(mongo, request.params.ACCESSTOKEN, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
    }
  });
})

// auth code from https://c9.io/barberboy/passport-google-oauth2-example
// send auth request to google
app.get('/auth/twitter', passport.authenticate('twitter'))

// get auth callback from google
app.get('/auth/twitter/callback',
passport.authenticate('twitter'),
function(request, response) {
  console.log("finished authentication");
  if (request.user) {
    response.render('pages/index', {'user':request.user[1].username, 'token':request.user[0]});
    // response.render('pages/index', {''user':request.user.emails[0].value, 'poll':null'});
  } else { response.jsonp(401); }
});

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connected to mongodb');
    mongo = db;
    app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
    });
  }
});
