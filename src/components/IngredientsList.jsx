function IngredientsList({ingredientsListedItems}) {    

    return (
        <section className="ingredients-list">
            <h2>Ingredients on hand:</h2>
            <ul>
                {ingredientsListedItems}
            </ul>
        </section>
    )
}

export default IngredientsList;