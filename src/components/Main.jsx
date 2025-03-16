import { useState } from "react";

function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");

    function handleSubmit(event) {
        event.preventDefault(); // Prevents page refresh

        if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
            setIngredients([...ingredients, newIngredient]); // Add new ingredient to the list
            setNewIngredient(""); // Clear input field
        }
    }

    return (
        <main className="container">
            {/* Ingredient Input Section */}
            <section className="ingredient-input">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="ingredient" 
                        autoComplete="off" 
                        className="ingredient" 
                        placeholder="e.g. oregano" 
                        aria-label="Add ingredient" 
                        value={newIngredient} 
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                    <button type="submit" className="button">Add ingredient</button>
                </form>
            </section>

            {/* Ingredients List */}
            <section className="ingredients-list">
                <h2>Ingredients on hand:</h2>
                <ul>
                    {ingredients.length === 0 ? (
                        <p>Add your first ingredient</p>
                    ) : (
                        ingredients.map((ingredient, index) => (
                            <li key={`${ingredient}-${index}`}>{ingredient}</li>
                        ))
                    )}
                </ul>
            </section>

            {/* Recipe Suggestion Section */}
            <aside className="recipe-suggestion">
                <div className="ready-for">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button className="suggestion-button" type="button">GET RECIPE</button>
            </aside>
        </main>
    );
}

export default Main;