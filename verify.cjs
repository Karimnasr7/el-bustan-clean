// verify.js
const bcrypt = require('bcryptjs');

const myPassword = '123%abc';

// نفس عدد الجولات التي نستخدمها في الكود (saltRounds = 10)
const saltRounds = 10; 

bcrypt.hash(myPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('The correct hash for "123%abc" is:');
  console.log(hash);
});