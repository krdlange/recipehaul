import React from "react";
import Card from "react-bootstrap/Card";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;


export default function Recipeinfo({
  visible,
  closePane,
  recipeInfo,
  addToCart,
  saveRecipe,
  recipeIngredients  
}) 

{

  return (
    <SlidingPane
    className="sliding-pane"
    isOpen={visible}
    title="Return to recipe research"
    width={window.innerWidth < 600 ? "100%" : "800px"}
    onRequestClose={closePane}
  >

    <div>
      {/* IMG, QUICK FACTS */}
      <div className="container-fluid mt-2">
        <Card>
          <Card.Body>
            <div className="container d-flex flex-row">
              <div className="w-50">
                <img className="img-fluid rounded" src={recipeInfo.image} />
              </div>
              <div className="ms-3 w-50">
                <h1>{recipeInfo.title}</h1>
                <p><strong>Price per serving:  {getFormattedPrice(recipeInfo.pricePerServing/100)}</strong></p>
                <p><strong>Ready in: {recipeInfo.readyInMinutes} minutes</strong></p>
                <div className="d-flex w-100">
                  <button className="btn btn-success" onClick={addToCart}>Add to cart</button>
                  <button className="btn btn-success ms-1" onClick={saveRecipe}>Save recipe</button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* INSTRUCTIONS */}
      <div className="container mt-4">
        <Card>
          <Card.Body>
            <div className="container">
              <h3>Instructions</h3>
              {recipeInfo.analyzedInstructions && (
                <div>
                  {recipeInfo.analyzedInstructions[0].steps.map((steps) => {
                    return (
                      <p key={steps.number}>
                        {steps.number}. {steps.step}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* INGREDIENTS & PRICE */}
      <div className="container mt-4">

        <Card>
          <Card.Body>
            <div className="col-md-8 ms-4">
                  <h3>Ingredients</h3>
                  {recipeIngredients.ingredients && (
                    <div>
                        {recipeIngredients.ingredients.map((ingredients, index) => { return (
                            <div key={index} className="d-flex justify-content-between">
                            <p>{ingredients.name}</p>
                            <p>{ingredients.amount.us.value} {ingredients.amount.us.unit}</p>
                            </div>
                        )})}
                        <hr/>
                        <div className="d-flex flex-wrap">
                        <p className="w-100">Total cost per serving: {getFormattedPrice(recipeIngredients.totalCostPerServing/100)} </p>
                        <p className="w-100">Total cost per recipe: {getFormattedPrice(recipeIngredients.totalCost/100)} </p>
                        </div>
                    </div>
                  )}
            </div>
          </Card.Body>
        </Card>
        </div>
      
    </div>
    </SlidingPane>
  );
}
