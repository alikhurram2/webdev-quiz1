const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const ingredients = mongoose.model('ingredients', ingredientsSchema);

module.exports = ingredients;