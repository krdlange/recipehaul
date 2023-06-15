var express = require('express');
var router = express.Router();
const db = require("../model/helper");


/* GET saved_recipes page. */

async function getRecipes() {
    try {
        let recipes = await db("SELECT * from recipes_saved;");
        return recipes.data;
    } catch (err) {
        return err;
    }
};

// GET saved recipes from the DB table

router.get('/', async (req, res) => {
  //res.send({ message: 'hello from the backend' });
 const recipes = await getRecipes();
 res.send(recipes);
});


 // POST the recipe to be saved by the user 
 router.post('/', async(req,res) => {
    console.log(req.body);
    let {recipe_ID, user_id, recipe_image, recipe_title, recipe_servings, recipe_pricePerServing, recipe_readyInMinutes } = req.body;
   
    await db(`INSERT INTO recipes_saved (recipe_ID, user_id, recipe_image, recipe_title,  recipe_servings, recipe_pricePerServing, recipe_readyInMinutes, recipe_orderStatus)
     VALUES ("${recipe_ID}","${user_id}", "${recipe_image}", "${recipe_title}", "${recipe_servings}","${recipe_pricePerServing}", "${recipe_readyInMinutes}", "0" );`);
    
    res.send({message: "Recipe added successfully!"});
   });

    
   router.put('/:recipeID', async(req,res) => {
    console.log(req.params);
    console.log(req.body.recipe_orderStatus);
    console.log("Recipe to be updated is: ", req.params.recipeID);
    await db(`UPDATE recipes_saved SET recipe_orderStatus = "${req.body.recipe_orderStatus}" WHERE recipe_ID = "${req.params.recipeID}" and user_id=1;`);
    const recipes = await getRecipes();
    res.send(recipes);
   })
   
   router.delete('/:recipeID', async(req,res) => {
    console.log(req.params);
    console.log("Recipe to be deleted is: ", req.params.recipeID);
    await db(`DELETE FROM recipes_saved WHERE recipe_ID = ${req.params.recipeID} AND user_id = 1;`);
    const recipes = await getRecipes();
    res.send(recipes);
   })

module.exports = router;
