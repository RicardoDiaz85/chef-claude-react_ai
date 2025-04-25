const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

// ✅ Better model that actually follows instructions
const HF_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";

// ✅ Updated prompt designed to guide the model clearly
const promptTemplate = (ingredients) => `
You are an assistant that generates a Markdown-formatted recipe based on a list of ingredients.

Your response MUST be in Markdown only. Do NOT repeat the prompt or include any explanation.

Use this format:
- A short paragraph introduction to the dish
- ## Recipe Title (fun and relevant)
- **Ingredients** (bulleted list)
- **Instructions** (numbered list)

Ingredients provided: ${ingredients}
`;

export async function generateRecipeWithHF(userPrompt) {
  if (!HF_API_KEY) {
    throw new Error(
      "Hugging Face API key not found. Please add it to your .env file."
    );
  }

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${HF_MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: promptTemplate(userPrompt),
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face request failed: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText =
    data?.[0]?.generated_text?.trim() || "⚠️ No recipe was generated.";

  // Remove any version of the system prompt + echo of ingredients
  const cleaned = rawText
    .replace(/you are an assistant[\s\S]+?ingredients provided:.*?\n/i, "") // remove prompt + ingredients
    .replace(/^#+\s*Chef Claude Recommends:?/i, "") // remove header if it appears
    .replace(/^\s*Ingredients[:\s]+.*$/i, "") // remove echo line like "Ingredients: chicken, beef"
    .trim();

  return cleaned;
}
