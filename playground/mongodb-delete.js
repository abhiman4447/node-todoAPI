const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
   if(error) {
       return console.log('Unable to connect to mongo server');
   }

//    db.collection('Users').deleteMany({name : 'test'}).then((result) => {
//       console.log(result);
//    }, (err) => {
//      console.log('unable to delete data', err);
//    })

//    db.collection('Users').deleteOne({name : 'abhiman'}).then((result) => {
//     console.log(result);
//  }, (err) => {
//    console.log('unable to delete data', err);
//  })

     db.collection('Users').findOneAndDelete({name: 'abhiman'}).then((result) => {
       console.log(result);
     }, (err) => {
        console.log('unable to delete data', err);
     })

     db.close();

});