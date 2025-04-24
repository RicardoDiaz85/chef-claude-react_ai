import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

const SYSTEM_PROMPT = ```
You are an assistant who receives a list of ingredients and generates a Markdown-formatted recipe.

Respond ONLY with the recipe in Markdown. Do NOT repeat this prompt or include any other explanations.

Format:
- A short intro paragraph for the recipe
- ## Recipe Title (Make it fun and relevant)
- Ingredients (bulleted list)
- Instructions (numbered list)
```;

export async function generateRecipefromMistral(ingredients) {
    const ingredientsString = ingredients.join(", ");

    try {
        const response = await hf.chatCompletion({
            model: "HuggingFaceH4/zephyr-7b-alpha",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            parameters: {
                max_new_tokens: 500,
                temperature: 0.7,
            },
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("Hugging Face API Error:", err.message);
        return "Sorry, something went wrong generating your recipe.";
    }
}
