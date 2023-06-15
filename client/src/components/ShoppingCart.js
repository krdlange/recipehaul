import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Ingredient from "./Ingredient";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function ShoppingCart() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [clickedID, setID] = useState();
  //const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const {orderedIngredients, setOrderedIngredients, totalPrice, setTotalPrice} = useContext(Context);

  useEffect(() => {
    getRecipes();
  }, [clickedID]);

  const getRecipes = () => {
    fetch("/saved_recipes")
      .then((res) => res.json())
      .then((json) => json.filter((e) => e.recipe_orderStatus === 1))
      .then((json) => setRecipes(json))

      .catch((error) => {
        console.log(error);
      });
  };

  function addToOrder(e) {
    e.preventDefault();
    const priceOfRecipe = +window.document
      .getElementById("price")
      .innerText.replace(/^\D+/g, "");
    setTotalPrice((prev) => prev + priceOfRecipe);
  }

  function handleCheckout(price) {
    // add the selected recipe to the saved_recipes table
    /* fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_cost: price,
        user_id: 1,
      }),
    }).then((res) => res.json())
    .catch((error) => {
      console.log(error);
    }); */

    alert("Your order is accepted");
    navigate('/payment');
  }

  const handleClick = async (id) => {
    const response = await fetch(
      `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const info = await response.json();
    console.log(info.ingredients);
    setIngredients(info.ingredients);
    setID(id);
    console.log("Ingredients fetched are: ", ingredients);
    // alert('Ingredients fetched!');
  };

  const deleteRecipe = (id) => {
     setID(id);

    let confirmed = window.confirm(
      "Are you sure you want to delete this recipe from the cart?"
    );
    if (confirmed) {
    // 4. In recipes_saved, put orderStatus to false = 0
      fetch(`/saved_recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'recipe_orderStatus': 0, 
        }) 
      })
      .then (res => res.json())
      .catch((error) => {
        console.log(error);});

      alert("Recipe deleted from cart!");
      }

     }



  return (
    <div className="container-xxl">
      <div className="mt-5 mb-5">
        <h1 className="text-left">Shopping cart</h1>
      </div>

      <div className="d-flex flex-wrap row">
        <div className="w-100 mb-4">Select ingredients to add to your cart.</div>
      </div>

      <div className="row mb-4">
        {recipes.map((recipe) => {
          return (
            <div className="w-100 mb-4 text-center" key={recipe.recipe_ID}>
              <div className="d-flex h-100">
                <Card className="col-md-2 h-100">
                  <Card.Img
                    variant="top"
                    src={recipe.recipe_image}
                    alt={recipe.recipe_title}
                  />
                  <Card.Body className="d-flex flex-wrap justify-content-center">
                    <Card.Title className="mt-2 w-100">
                      {recipe.recipe_title}
                    </Card.Title>
                    <Button
                          className="mt-2 w-100 align-self-end"
                          onClick={() => deleteRecipe(recipe.recipe_ID)}
                        >
                          Delete recipe
                        </Button>
                  </Card.Body>
                </Card>

                <Accordion className="col-md-8">
                  <Accordion.Item eventKey={recipe.recipe_ID}>
                    <Accordion.Header
                      onClick={() => handleClick(recipe.recipe_ID)}
                    >
                      Order ingredients
                    </Accordion.Header>

                    <Accordion.Body>
                      {clickedID === recipe.recipe_ID && (
                        <>
                          <Ingredient
                            ingredients={ingredients}
                            servings={recipe.recipe_servings}
                          />
                          <button onClick={addToOrder}>Add to order</button>
                        </>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          );
        })}

        <div className="d-flex flex-wrap mt-4">
          <div className="w-100 d-flex justify-content-end"><h4>Total price: {getFormattedPrice(totalPrice)}</h4></div>
          <div className="w-100 d-flex justify-content-end"><Button onClick={() => handleCheckout(totalPrice)}>Checkout</Button></div>
        </div>
      </div>
    </div>
  );
}
