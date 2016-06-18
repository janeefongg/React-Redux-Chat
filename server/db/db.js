const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/reactchat', function(err, db) {
  console.log('Connection established!')
  if (err) {
    console.log(err);
  }
})