const {ObjectId} = require('mongodb');
const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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

//Post users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
       return user.generateAuthToken();
    }).then((token) => {   
       res.header('x-auth', token).send(user);
    }).catch((e) => {
       res.status(400).send(e);
    });
})

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject('no users found with the provided token');
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
     res.status(401).send();
  });
}

app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
})

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);  
    })
    res.send(user);
  }).catch((err) => {
   res.status(400).send();
  })
  
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send({users});
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

