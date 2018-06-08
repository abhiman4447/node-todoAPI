const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

var id = '5b193557ad76bf70585132c44';

if(!ObjectId.isValid()) {
    console.log('Id is not valid');
}

// Todo.find({completed: false}).then((todos) => {
//     console.log('Todos', todos);
// })

// Todo.findOne({completed: false}).then((todo) => {
//     console.log('Todo', todo);
// })

Todo.findById(id).then((todo) => {
    console.log('TodoById', todo);
}).catch((e) => {
  //console.log(e);
})