const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
   if(error) {
       return console.log('Unable to connect to mongo server');
   }

     db.collection('Users').findOneAndUpdate(
         { 
             name: 'nikhil'
         },
         {
             $set: {
                 name: 'abhiman'
             },
             $inc: {
                 age: 1
             }
         },
         {
             returnOriginal: false
         }
     ).then((result) => {
        console.log(result);
     }, (error) => {
        console.log('Unable to update', err);
     }) 

     db.close();

});