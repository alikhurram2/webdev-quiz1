const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingredients',
    }],
});

const recipe = mongoose.model('recipe', recipeSchema);

module.exports = recipe;