const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true
     }, // User's name.
  email: {
     type: String,
     required: true, 
     unique: true
     }, // Email for authentication.
  password: {
     type: String, 
     required: true 
    }, // Hashed password.
  createdAt: { 
    type: Date,
     default: Date.now 
    }, // Timestamp of user registration.
    realUser_id:{
      type: String,
      required:true
    }
});

module.exports = mongoose.model('User', userSchema);

//User.find()