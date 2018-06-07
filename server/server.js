var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   console.log(req.body);
   var todo = new Todo({
       text : req.body.text
   });

   todo.save().then((doc) => {
      res.send(doc);
   }, (err) => {
      res.status(400).send(err);
   });
})

app.post('/users', (req, res) => {
    var user = new User({
        email : req.body.email,
        password : req.body.password
    });

    user.save().then((doc) => {
       res.send(doc);
    }, (err) => {
        res.send(err);
    });
})

app.listen('3000', () => {
  console.log('server up on port 3000');
})




// var newTodo = new Todo({
//        text: 'Eat Dinner',
//        completed: false,
//        completedAt: 123
//    }
// ); 

// newTodo.save().then((result) => {
//    console.log('Data Saved');
//    console.log(result);
// }, (err) => {
//    console.log('Unable to save data', err);
// });

// var otherTodo = new Todo({
//     text: '  Remove the video '
// });

// otherTodo.save().then((result) => {
//     console.log('Data Saved');
//     console.log(JSON.stringify(result, undefined, 2));
// });

// var user = new User({
//     email: 'abhi4039@gmail.com',
//     password: 'test'
// });

// user.save().then((result) => {
//    console.log(JSON.stringify(result, undefined, 2));
// }, (err) => {
//    console.log('Unable to save user data', err);
// });

