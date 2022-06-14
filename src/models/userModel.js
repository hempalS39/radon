const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    userName: String,
    balance: Number, // Default balance at user registration is 100
	address: String,
	age: Number,
 	gender: {
        type: String,
        enum:["male" , "female" , "others"]
    },// Allowed values are - “male”, “female”, “other”
	isFreeAppUser: {
        type: Boolean,
        default: false
    }// Default false value.
    
}, { timestamps: true });

module.exports = mongoose.model('Userr', userSchema) //users



// String, Number
// Boolean, Object/json, array