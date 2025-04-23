import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function highlightRelevantText(reviewText: string, query: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that identifies and highlights relevant parts of text based on a query. Return only the original text with HTML highlighting tags (<mark>) around relevant portions."
        },
        {
          role: "user",
          content: `Please highlight the relevant parts of this review that relate to the query: "${query}"\n\nReview: ${reviewText}`
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    return response.choices[0].message.content || reviewText;
  } catch (error) {
    console.error('Error highlighting text:', error);
    return reviewText;
  }
}