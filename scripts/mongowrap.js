var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// SET THIS TO A DB ON MLAB FOR DEPLOYMENT.
var url = process.env.MONGO_ADDRESS;

module.exports.getTokenDetails = function(token, callback) {
  var filterclause = {'accessToken': token};
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      db.collection('accessTokens').findOne(filterclause, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // If no results found, redirect to a page notifying user
          console.log("MongoDB fetched details for token " + token);
          db.close();
          callback(err, result);
        }
      });
    }
  });
}

module.exports.saveToken = function(token, profile, callback) {
  var newEntry = {"accessToken": token, "profile": profile};
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      db.collection('accessTokens').insertOne(newEntry, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
          db.close();
          callback(err, result);
        }
      });
    }
  });
}

module.exports.removeToken = function(token, callback) {
  var filterclause = {'accessToken': token};
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      db.collection('accessTokens').findOneAndDelete(filterclause, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("mongodb removeQuery result: " + JSON.stringify(result));
          db.close();
          callback(err, result);
        }
      });
    }
  });
}
