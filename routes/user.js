const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe');

router.use(async (req, res, next) => {
    if(req.user.role == "teacher") return res.json({ msg: "TEACHER NOT AUTHORIZED" })
    else next()
})

router.get('/viewAllRecipes', async (req, res) => {
    try {
        let recipes = await recipe.find({}).select('name description');
        if (!recipes) return res.json({ msg: 'No recipes found' });
        return res.json({ recipes });
    } catch (error) {
        console.error(error);
    }
});

router.get('/viewRecipeDetails', async (req, res) => {
    try {
        const id = req.body.id;
        let recipeData = await Recipe.findById(id).populate('ingredients');
        if (!recipeData) return res.json({ msg: 'Recipe not found' });
        return res.json({ recipe: recipeData });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;