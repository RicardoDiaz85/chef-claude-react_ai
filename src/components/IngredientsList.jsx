function IngredientsList({ ingredients }) {
    return (
      <section className="ingredients-list">
        <h2>Ingredients on hand:</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section> 
    );
  }
  
  export default IngredientsList;
  
  /*
🧼 Recommended Best Practice:
Instead of passing ingredientsListedItems (the rendered <li> elements), pass the raw ingredients array to IngredientsList, and let that component handle rendering.

✅ Why?
Separation of concerns: Main holds the data; IngredientsList handles presentation.

Easier to reuse IngredientsList anywhere with any array.
  */