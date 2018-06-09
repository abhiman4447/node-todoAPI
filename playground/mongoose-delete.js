const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

var id = '5b18f40b2d5280fc54c13481';

// Todo.remove().then((result) => {
//  console.log(result);
// });

// Todo.findOneAndRemove({}).then((result) => {
//   console.log(result);
// });

Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
})

