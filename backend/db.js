
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://saptarshimajumder12345:chono54321@cluster0.2grkc5r.mongodb.net/gpay');

// Create a mongoose schema for the users table
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password: {
        type : String,
        required : true,
        trim : true
    },
    firstname:  {
        type : String,
        required : true,
        trim : true
    },
    lastname:  {
        type : String,
        required : true,
        trim : true
    },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance:{
        type : Number,
        required : true,
    },
})

const Account = mongoose.model('Account',accountSchema);
module.exports = {
	User,
    Account,
};
