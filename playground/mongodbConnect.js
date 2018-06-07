//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

var obj = new ObjectId();
console.log(obj);

var user = {name: 'anirban', age: 28};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
   if(error) {
       return console.log('Unable to connect to the mongo server');
   }  
   console.log('Connected to mongo server');

//    db.collection('Todos').insertOne({
//       text: 'Test Data',
//       completed: false
//    }, (error, result) => {
//       if(error) {
//           return console.log('unable to insert todo', error);
//       }
//       console.log(JSON.stringify(result.ops, undefined, 2));
//    })

      db.collection('Users').insertOne({
         name: 'abhiman',
         age: 27,
         location: 'pune'
      }, (error, result) => {
         if(error) {
            return console.log('unable to insert user', error);
         }
         console.log(result.ops[0]._id.getTimestamp());
      })

   db.close();
});
