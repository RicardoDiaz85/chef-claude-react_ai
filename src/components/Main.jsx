import React, { useState } from "react";
import IngredientsList from './IngredientsList'
import Recipe from './Recipe'

function Main() {
    const [ingredients, setIngredients] = useState([])
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        
        if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
            setIngredients([...ingredients, newIngredient]); // Add new ingredient to the list
        }
    }

    const ingredientsListedItems = ingredients.map(ingredient => (<li key={ingredient}>{ingredient}</li>))

    // Boolean to show / not show reciple
    const [recipeShown, setRecipeShown] = useState(false) 

    function toggleRecipeShown (){
        setRecipeShown(prevRecipeShown => !prevRecipeShown)
    }


    return (
        <main className="container">
            {/* ======      INGREDIENTS INPUT FORM      ====== */}
            <section className="ingredient-input">
                <h2>👋 Welcome to Chef Claude!</h2>
                <p>Just add at least 3 ingredients, and Chef Claude will whip up a delicious recipe just for you.
                Start by typing your first ingredient below!</p>
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


            {/* ======      INGREDIENTS LIST      ====== */}
            {ingredientsListedItems.length 
                ? <IngredientsList ingredientsListedItems={ingredientsListedItems} /> 
                : null}

                

            {/* ======      RECIPE SUGGESTION SECTION      ====== */}
            {ingredientsListedItems.length >= 3 ? 
            <aside className="recipe-suggestion">
                <div className="ready-for">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={toggleRecipeShown} className="suggestion-button" type="button">GET RECIPE</button>
            </aside>
            : null}

            {/* ======      AI GENERATED RECIPE     ====== */}
            {recipeShown ? <Recipe /> : null}
            
        </main>
    );
}

export default Main;