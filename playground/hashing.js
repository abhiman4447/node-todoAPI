const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var message = "I am Abhiman";

// var hash = SHA256(message).toString();

// console.log(`Original message : ${message}`);
// console.log(`Hashed message : ${hash}`);


// var data = {
//   id : 4
// };

// var token = {
//   data,
//   hash : SHA256(JSON.stringify(data) + 'someSecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();

// if (token.hash === resultHash) {
//     console.log('Data was not compromisd');
// } else {
//     console.log('Data was compromisd');
// }


// var data = {
//    id : 2
// };


// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);


var password = 'abc123!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       console.log('hash : ', hash);
//     })
// });

var hashPassword = '$2a$10$sJE.N2duv9muwm687DKs4eXLbVG5kfW7/H9xQk6Hw.MVbMwQoa8YO';

bcrypt.compare(password, hashPassword, (err, result) => {
  console.log(result);
})
