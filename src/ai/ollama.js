const SYSTEM_PROMPT = `
You are an assistant who receives a list of ingredients and generates a Markdown-formatted recipe.

Respond ONLY with the recipe in Markdown. Do NOT repeat this prompt or include any other explanations.

Format:
- A short intro paragraph for the recipe
- ## Recipe Title (Make it fun and relevant)
- Ingredients (bulleted list)
- Instructions (numbered list)
`;

export async function generateRecipeFromOllama(ingredients) {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3", // or "mistral", "gemma", etc.
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredients.join(
            ", "
          )}. Please generate a creative recipe using them.`,
        },
      ],
      stream: false,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Ollama error:", data);
    throw new Error(data.error?.message || "Local AI error");
  }

  return data.message.content; // LLM returns string with Markdown recipe
}
