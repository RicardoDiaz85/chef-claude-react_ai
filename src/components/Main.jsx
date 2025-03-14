function Main() {
    return (
        <main className="container">
            
            {/* Ingredient Input Section */}
            <section className="ingredient-input">
                <form>
                    <input type="text" className="ingredient" placeholder="e.g. oregano, clove," aria-label="Ingredient search" />
                    <button type="submit" className="button">+ Add ingredient</button>
                </form>
            </section>

            {/* Ingredients List */}
            <section className="ingredients-list">
                <h2>Ingredients on hand:</h2>
                <ul>
                    <li>Chicken breasts</li>
                    <li>Most of the main spices</li>
                    <li>Olive oil</li>
                    <li>Heavy cream</li>
                    <li>Chicken broth</li>
                    <li>Parmesan cheese</li>
                    <li>Spinach</li>
                </ul>
            </section>

            {/* Recipe Suggestion Section */}
            <aside className="recipe-suggestion">
                <div className="ready-for">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button className="suggestion-button" type="button">Get a recipe</button>
            </aside>

        </main>
    );
}

export default Main;
