import React, { useState } from "react";

function Main() {
    
    const [ingredients, setIngredients] = useState([])
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        
        if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
            setIngredients([...ingredients, newIngredient]); // Add new ingredient to the list
        }
    }


    // Boolean to show / not show reciple
    const [recipeShown, setRecipeShown] = useState(false) 

    function toggleRecipeShown (){
        setRecipeShown(prevRecipeShown => !prevRecipeShown)
    }

    


    const ingredientsListedItems = ingredients.map(ingredient => (<li key={ingredient}>{ingredient}</li>))

    

    return (
        <main className="container">
            {/* Ingredient Input Section */}
            <section className="ingredient-input">

                <form action={addIngredient}>

                    <input 
                        type="text" 
                        name="ingredient" 
                        autoComplete="off" 
                        className="ingredient" 
                        placeholder="e.g. oregano" 
                        aria-label="Add ingredient"
                    />

                    <button type="submit" className="button">
                        Add ingredient
                    </button>

                </form>
                
            </section>

            {/* Ingredients List */}
            {ingredientsListedItems.length ?
            <section className="ingredients-list">
                { <h2>Ingredients on hand:</h2>}
                <ul>
                    {ingredientsListedItems}
                </ul>
            </section>
            : null}

            {/* Recipe Suggestion Section*/}
            {ingredientsListedItems.length >= 3 ? 
            <aside className="recipe-suggestion">
                <div className="ready-for">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={toggleRecipeShown} className="suggestion-button" type="button">GET RECIPE</button>
            </aside>
            : null}

            {/* Recipe Suggestion Section*/}
            {recipeShown ?
            <section>
                <h2>Chef Claude Recommends:</h2>
                <article className="suggested-recipe-container" aria-live="polite">
                    <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>
                    <h3>Beef Bolognese Pasta</h3>
                    <strong>Ingredients:</strong>
                    <ul>
                        <li>1 lb. ground beef</li>
                        <li>1 onion, diced</li>
                        <li>3 cloves garlic, minced</li>
                        <li>2 tablespoons tomato paste</li>
                        <li>1 (28 oz) can crushed tomatoes</li>
                        <li>1 cup beef broth</li>
                        <li>1 teaspoon dried oregano</li>
                        <li>1 teaspoon dried basil</li>
                        <li>Salt and pepper to taste</li>
                        <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                    </ul>

                    <strong>Instructions:</strong>
                    <ol>
                        <li>Bring a large pot of salted water to a boil for the pasta.</li>
                        <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                        <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                        <li>Stir in the tomato paste and cook for 1 minute.</li>
                        <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                        <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                        <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                        <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                        <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                    </ol>
                </article>
            </section> : null}
        
            
        </main>
    );
}

export default Main;