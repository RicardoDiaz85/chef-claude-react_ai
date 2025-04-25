import React, { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList"; // Component to display added ingredients
import Recipe from "./Recipe"; // Component to display the AI-generated recipe
import { generateRecipeFromOllama } from "../ai/ollama"; // Local AI function using Ollama
import { generateRecipeWithHF } from "../ai/huggingface"; // Hugging Face API

function Main() {
  // === React State Variables ===

  const [ingredients, setIngredients] = useState([]); // Holds the list of ingredients
  const [model, setModel] = useState("ollama"); // Default is Ollama

  const [recipe, setRecipe] = useState(false); // Holds the generated recipe (Markdown string)
  const elementRef = useRef(null); // ✅ best practice

  useEffect(() => {
    if (recipe !== "" && elementRef.current !== null) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  const [loading, setLoading] = useState(false); // Controls button loading state (prevents spam)

  // === Function to Add Ingredient from Form ===
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient"); // Get value from input field
    console.log(newIngredient);

    // Add if not empty and not already in list
    if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
      setIngredients([...ingredients, newIngredient]);
    }
  }

  // === Function to Call Local AI (Ollama) ===
  async function getRecipe() {
    setLoading(true);
    try {
      let markdown;

      if (model === "ollama") {
        markdown = await generateRecipeFromOllama(ingredients);
      } else {
        markdown = await generateRecipeWithHF(ingredients.join(", "));
      }

      setRecipe(markdown);
    } catch (err) {
      alert("Failed to generate recipe: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      {/* ====== INGREDIENT INPUT FORM ====== */}
      <section className="ingredient-input">
        <h2>👋 Welcome to Chef Claude!</h2>
        <div className="model-toggle">
          <label htmlFor="model-select">Choose AI model:</label>
          <select
            id="model-select"
            onChange={(e) => setModel(e.target.value)}
            value={model}
          >
            <option value="ollama">Ollama (local)</option>
            <option value="huggingface">Huggingface (cloud)</option>
          </select>
        </div>

        <p>
          Just add at least 3 ingredients, and Chef Claude will whip up a
          delicious recipe just for you.
        </p>

        {/* Form to input ingredients */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page refresh
            addIngredient(new FormData(e.target)); // Pass form data
            e.target.reset(); // Clear input field
          }}
        >
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

      {/* ====== INGREDIENTS LIST ====== */}
      {ingredients.length > 0 && <IngredientsList ingredients={ingredients} />}

      {/* ====== RECIPE SUGGESTION BUTTON ====== */}
      {ingredients.length >= 3 && (
        <aside className="recipe-suggestion">
          <div ref={elementRef} className="ready-for">
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>

          <button
            onClick={getRecipe}
            className="suggestion-button"
            type="button"
            disabled={loading} // Prevent multiple clicks
          >
            {loading ? "Generating..." : "GET RECIPE"}
          </button>
        </aside>
      )}

      {/* ====== GENERATED RECIPE DISPLAY ====== */}
      {recipe && (
        <Recipe recipe={recipe} /> //recipe is the markdown string, and getRecipe is a function — but your <Recipe /> component is expecting a recipe prop, not a function.
      )}
    </main>
  );
}

export default Main;
