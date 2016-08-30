
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient

var init = function(url){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected succesfully to server");
    module.exports.db = db;
  });
}



var find = function(db,attributes,collectionName,callback){
  var collection = db.collection(collectionName);
  collection.find(attributes).toArray(function(err,result){
    assert.equal(err, null);
    callback(result);
  });
}

var insert = function(db,collectionName,collectionData,callback){
  var collection = db.collection(collectionName);
  collection.insertOne(collectionData, function(err, result) {
    assert.equal(err, null);
    callback(result,collectionData);
  });
}

module.exports.insert = insert;
module.exports.find = find;
module.exports.init = init;
module.exports.ObjectID = require('mongodb').ObjectID;
