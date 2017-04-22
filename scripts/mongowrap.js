var mongodb = require('mongodb');

// Collection: pinterestclone

module.exports.getimages = function(mongoConnection, callback) {
  mongoConnection.collection('pinterestclone').find().toArray(function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log("retrieved images from database");
      callback(null, result);
    }
  })
}

module.exports.uploadimage = function(mongoConnection, imageStorageObject, callback) {
  mongoConnection.collection('pinterestclone').insertOne(imageStorageObject, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log("stored imageobject: " + JSON.stringify(imageStorageObject));
      callback(null, result);
    }
  })
}

module.exports.likeimage = function(mongoConnection, imageid, username, callback) {

}

module.exports.deleteimage = function(mongoConnection, imageid, callback) {

}

module.exports.getTokenDetails = function(mongoConnection, token, callback) {
  var filterclause = {'accessToken': token};
  mongoConnection.collection('accessTokens').findOne(filterclause, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      // If no results found, redirect to a page notifying user
      console.log("MongoDB fetched details for token " + token);
      callback(null, result);
    }
  });
}

module.exports.saveToken = function(mongoConnection, token, profile, callback) {
  var newEntry = {"accessToken": token, "profile": profile};
  mongoConnection.collection('accessTokens').insertOne(newEntry, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log('Inserted documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      callback(null, result);
    }
  });
}

module.exports.removeToken = function(mongoConnection, token, callback) {
  var filterclause = {'accessToken': token};
  mongoConnection.collection('accessTokens').findOneAndDelete(filterclause, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log("mongodb removeQuery result: " + JSON.stringify(result));
      callback(null, result);
    }
  });
}
