const {ObjectId} = require('mongodb');
const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
var port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
})

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectId.isValid) {
      return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }  
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo) {
          return res.status(404).send();
      }  
      res.send({todo});  
    }).catch((e) => {
       res.status(400).send();
    })
})

app.patch('/todos/:id', (req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);
   if(!ObjectId.isValid) {
    return res.status(404).send();
   }
   if(_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
   } else {
     body.completed = false;
     body.completedAt = null;
   }
   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
     if(!todo) {
        return res.status(404).send();
     }  
     res.send(todo);
   }).catch((e) => {
    res.status(400).send();
 })
})


app.listen(port, () => {
  console.log(`server up on port ${port}`);
})

module.exports = {app};


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

