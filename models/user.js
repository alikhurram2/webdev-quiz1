const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
    }],
});

const user = mongoose.model('user', userSchema);

module.exports = user;