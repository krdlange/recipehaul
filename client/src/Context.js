import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	const [orderedIngredients, setOrderedIngredients] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	return (
		<Context.Provider value={{ orderedIngredients, setOrderedIngredients, totalPrice, setTotalPrice }}>
			{children}
		</Context.Provider>
	);
};
