//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

// var obj = new ObjectId();
// console.log(obj);

// var user = {name: 'anirban', age: 28};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
   if(error) {
       return console.log('Unable to connect to the mongo server');
   }  
   console.log('Connected to mongo server');

//    db.collection('Todos').find().toArray().then((docs) => {
//      console.log(JSON.stringify(docs, undefined, 2));
//     }, (err) => {
//     console.log('Unable to fetch data', err);
//    })

//    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
//     console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//    console.log('Unable to fetch data', err);
//   })

//   db.collection('Todos').find({_id: new ObjectId('5b16e684e52da7316c0d40a2')}).toArray().then((docs) => {
//     console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//    console.log('Unable to fetch data', err);
//   })

db.collection('Todos').find().count().then((count) => {
    console.log(`Todos Count : ${count}`);
}, (err) => {
    console.log('unable to fetch todos', err);
})

db.collection('Users').find({name: 'abhiman'}).count().then((count) => {
   console.log(`User count is ${count}`);
}, (err) => {
    console.log('unable to fetch todos', err);
})

   db.close();
});
