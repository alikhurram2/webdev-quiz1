const express = require('express');
const router = express.Router();
const ingredient = require('../models/ingredients');
const recipe = require('../models/recipe');

router.use(async (req, res, next) => {
    if(!req.user.role == "admin") return res.json({ msg: "NOT ADMIN" })
    else next()
})

// admin can add new ingredients
router.post("/addIngredient", async (req, res) => {
    try {
        const { name, description } = req.body;  
        let iv = await ingredient.findOne({ name });
        if (iv) return res.json({ msg: "Ingredient already exists" });
        console.log("Ingredient:", req.body);
        await ingredient.create({...req.body });
        return res.json({ msg: "INGREDIENT ADDED" });
    } catch (error) {
        console.error(error);
    }
});

// admin can add new recipes with their ingredients
router.post("/addRecipe", async (req, res) => {
    try {
        const { name, description, ingredients } = req.body;  
        let rv = await recipe.findOne({ name });
        if (rv) return res.json({ msg: "Recipe already exists" });
        console.log("Recipe already exists:", req.body);
        const ingredientIds = [];
        for(const ingredientName of ingredients){
            let iv = await ingredient.findOne({ name: ingredientName });
            if(iv){
                ingredientIds.push(iv._id);
            } else {
                return res.json({ msg: `Ingredient ${ingredientName} does not exist` });
            }
        }
        const newRecipe = await recipe.create({ name, description, ingredients: ingredientIds });
        await newRecipe.save();
        return res.json({ msg: "RECIPE ADDED" });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;