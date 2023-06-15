import React, {useState, useEffect, useContext} from 'react';
import "./Ingredient.css";
import { Context } from "../Context";


// Adapted from here:
 // https://codesandbox.io/s/wild-silence-b8k2j?file=/src/App.js

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function Ingredient({ingredients, servings}) {

  const defaultState =  new Array(ingredients.length).fill(false); 
  const [checkedState, setCheckedState] = useState(()=> (defaultState));
    console.log(new Array(ingredients.length).fill(false))
    console.log("Checked state is", checkedState);

  const [serving, setServings] = useState(servings);
  const [total, setTotal] = useState(0);
  const {orderedIngredients, setOrderedIngredients} = useContext(Context);
 

  
  const handleOnChange = (position, serving) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
   // console.log("Checked state is: ",checkedState);
   // console.log("Updated checked state is: ",updatedCheckedState);

    if (updatedCheckedState[position]) {
      console.log("Ingredient ordered is: ", ingredients[position]);

     let ingredient = {
      name: ingredients[position].name,
      price: ingredients[position].price*(serving/servings),
      amount: ingredients[position].amount.us.value*(serving/servings),
      unit: ingredients[position].amount.us.unit,
      image: `https://spoonacular.com/cdn/ingredients_100x100/${ingredients[position].image}`
     };      
    console.log("Ingredient info for given servings: ", ingredient);
    setOrderedIngredients([...orderedIngredients, ingredient]);
    } else { 
      console.log("Remove this ingredient from the array by some unique id");
  }

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + ingredients[index].price*(serving/servings)/100;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };  
  
  function handleServings(e) {
    setServings(e.target.value);
  }
  
  return (
    <div className="App">
    <div className="toppings-list-item">
      <h4 className="left-section">Select ingredients</h4>
      <input type="text" onChange={(e)=>handleServings(e)} value={serving} />
      <h4 className="right-section">Servings {serving}</h4>
      </div>
      <ul className="toppings-list">
        {ingredients.map(({ name, price}, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index, serving)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice((price*serving/servings)/100)}</div>
                
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Total price of the recipe:</div>
            <div className="right-section" id="price">{getFormattedPrice(total)}</div>

           </div>          
         
        </li>
      </ul>
    </div>
  );
}
