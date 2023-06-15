import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Recipeinfo from "./Recipeinfo";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

const animatedComponents = makeAnimated();


export default function RecipesA() {
   //console.log(process.env.REACT_APP_API_KEY);


  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState([]);
  const [intolerance, setIntolerance] = useState([]);
  const [mealType, setMeal] = useState([]);
  const [userInput, setInput] = useState([]);
  const [addPane, setAddPane] = useState({ visible: false });
  const [recipeID, setRecipeId] = useState();
  const [resultCount, setResultCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(9);
  const [show, setShow] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  // should we put into the DB table?
  // https://spoonacular.com/food-api/docs#Diets
  const dietOptions = [
    { value: "gluten-free", label: "gluten-free" },
    { value: "ketogenic", label: "ketogenic" },
    { value: "vegetarian", label: "vegetarian" },
    { value: "lacto-vegetarian", label: "lacto-vegetarian" },
    { value: "vegan", label: "vegan" },
    { value: "whole30", label: "whole30" },
  ];

  // https://spoonacular.com/food-api/docs#Meal-Types
  const mealTypes = [
    { value: "main course", label: "main course" },
    { value: "snack", label: "snack" },
    { value: "breakfast", label: "breakfast" },
    { value: "dessert", label: "dessert" },
    { value: "side dish", label: "side dish" },
    { value: "salad", label: "salad" },
  ];

  // https://spoonacular.com/food-api/docs#Intolerances

  const intolerances = [
    { value: "dairy", label: "dairy" },
    { value: "egg", label: "egg" },
    { value: "soy", label: "soy" },
    { value: "peanut", label: "peanut" },
    { value: "wheat", label: "wheat" },
    { value: "grain", label: "grain" },
  ];

  let intoleranceAPI = intolerance.map((e) => e.value);
  let dietAPI = diet.map((e) => e.value);
  let mealTypeAPI = mealType.map((e) => e.value);

  useEffect(() => {
    getRecipes();
  }, [recipeCount]);

  const getRecipes = async () => {
    const api = await fetch(
      `${BASE_URL}/complexSearch?apiKey=a072be7433bd4f29b08e974c3ee7997d&query=${userInput}&diet=${dietAPI}&intolerances=${intoleranceAPI}&type=${mealTypeAPI}&number=${recipeCount}&addRecipeInformation=true`
    );
    const data = await api.json();
    console.log(data);
    setRecipes(data.results);
    setResultCount(data.totalResults);
  };

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getRecipes();
  }

  function viewRecipe(id) {
    setAddPane({ visible: true });
    setRecipeId(id);
    fetchRecipeIngredients(id);
  }

  const fetchRecipeIngredients = async (id) => {
    const response = await fetch(
      `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const info = await response.json();
    console.log(info);
    setRecipeIngredients(info);
  };

  function saveRecipe (recipeInfo) {
    // add the selected recipe to the saved_recipes table
    fetch("/saved_recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_ID: recipeInfo.id,
        user_id: 1,
        recipe_image: recipeInfo.image,
        recipe_title: recipeInfo.title,
        recipe_servings: recipeInfo.servings,
        recipe_pricePerServing: recipeInfo.pricePerServing,
        recipe_readyInMinutes: recipeInfo.readyInMinutes,
      }),
    }).then((res) => res.json())

    .catch((error) => {

      console.log(error);
    });

    alert("Recipe saved");
  };

  const addToCart = (id) => {
    setRecipeId(id);
    let recipe = recipes.find((rec) => rec.id === id);
    console.log(recipes.find((rec) => rec.id === id));
    saveRecipe(recipe);
    // In recipes_saved, put orderStatus to true
    fetch(`/saved_recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_orderStatus: 1,
      }),
    }).then((res) => res.json())

    .catch((error) => {
      console.log(error);});

    alert("Recipe added to cart!");
  };

  function moreRecipes() {
    setRecipeCount(recipeCount * 2);
    console.log(recipeCount);
  }

  const handleSearch = () => {
    setShow(true);
  };

  return (
    <div className="container-xxl">
      <div className="mt-4 mb-4">
        <h1 className="text-center">Discover new recipes you'll love</h1>
        <p className="text-center">
          Enter your eating preferences, restrictions, needs and more.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                <p className="mt-2 mb-2">Select your diet restrictions</p>
              </div>

              <div className="card-body">
                <div className="form-group">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={dietOptions}
                    onChange={(value) => setDiet(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                <p className="mt-2 mb-2">Select your intolerances</p>
              </div>

              <div className="card-body">
                <div className="form-group">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={intolerances}
                    onChange={(value) => setIntolerance(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                <p className="mt-2 mb-2">Select a meal type</p>
              </div>

              <div className="card-body">
                <div className="form-group">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={mealTypes}
                    onChange={(value) => setMeal(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                <p className="mt-2 mb-2">
                  Search by ingredient, recipe name or random word
                </p>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={(e) => handleInput(e)}
                    value={userInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <button
              onClick={handleSearch}
              className="btn btn-success center mb-4"
              type="submit"
            >
              Search recipes
            </button>
          </div>
        </div>
      </form>

      {show ? (
        <div className="container">
          {recipeCount && (
            <h5 className="mb-4">
              We found {resultCount} recipes related to your query: "{userInput}
              "
            </h5>
          )}
          <div className="row">
            {recipes.map((recipe) => {
              return (
                <div className="col-md-4 mb-4 text-center" key={recipe.id}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={recipe.image}
                      alt={recipe.title}
                    />
                    <Card.Body className="d-flex flex-wrap justify-content-center">
                      <Card.Title className="mt-2 w-100">
                        {recipe.title}
                      </Card.Title>
                      <div className="d-flex flex-wrap justify-content-center">
                        <Button
                          className="mt-2 w-100 align-self-end"
                          onClick={() => viewRecipe(recipe.id)}
                        >
                          View recipe
                        </Button>
                        <Button
                          className="mt-2 w-100 align-self-end"
                          onClick={() => addToCart(recipe.id)}
                        >
                          Add to cart
                        </Button>
                        <Button
                          className="mt-2 w-100 align-self-end"
                          onClick={() => saveRecipe(recipe)}
                        >
                          Save to favourites
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}

            {addPane.visible && (
              <Recipeinfo
                visible={addPane.visible}
                closePane={() => setAddPane({ visible: false })}
                recipeInfo={recipes.find((rec) => rec.id === recipeID)}
                addToCart={() => addToCart(recipeID)}
                saveRecipe={() =>
                  saveRecipe(recipes.find((rec) => rec.id === recipeID))
                }
                recipeIngredients={recipeIngredients}
              />
            )}
          </div>
          <div className="d-flex justify-content-center m-4">
            <Button
              onClick={(e) => {
                moreRecipes(e);
              }}
            >
              Load more recipes
            </Button>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
