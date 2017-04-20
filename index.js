var express = require('express');
var app = express();
var mongowrap = require('./scripts/mongowrap.js');
var path = require('path');
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
// Each type of passport plugin will require its specific oauth strategy.
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// Need to create credentials on https://console.developers.google.com/
// MOVE THESE INTO ENV VARIABLES BEFORE DEPLOYING.
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
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

passport.use(new GoogleStrategy({
  clientID:     GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  // callbackURL: "http://oauth-template-decky.herokuapp.com/auth/google/callback",
  callbackURL: AUTHHOST + '/auth/google/callback',
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // Stuff to do after verified.
    console.log("PROFILE: " + profile);
    console.log("ACCESS TOKEN: " + JSON.stringify(accessToken));
    console.log("REFRESH TOKEN: " + JSON.stringify(refreshToken));
    // Store data in mongo collection
    // console.log(done);
    mongowrap.saveToken(accessToken, profile, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        return done(null, [accessToken, profile]);
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

app.get('/tokendetails/:ACCESSTOKEN', function(request, response) {
  // Query mongodb for profile corresponding to access token.
  mongowrap.getTokenDetails(request.params.ACCESSTOKEN, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("sending result for tokendetails");
      console.log(result);
      response.send(result);
    }
  })
})

app.get('/logout/:ACCESSTOKEN', function(request, response) {
  // Delete profile with this access token from mongodb.
  mongowrap.removeToken(request.params.ACCESSTOKEN, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
    }
  });
})

// auth code from https://c9.io/barberboy/passport-google-oauth2-example
// send auth request to google
app.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }))

// get auth callback from google
app.get('/auth/google/callback',
passport.authenticate('google'),
function(request, response) {
  console.log("finished authentication");
  if (request.user) {
    response.render('pages/index', {'user':request.user[1].name.givenName, 'token':request.user[0]});
    // response.render('pages/index', {''user':request.user.emails[0].value, 'poll':null'});
  } else { response.jsonp(401); }
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
