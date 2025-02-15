const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    // Use the Gemini 2.0 Flash endpoint as shown in your curl example.
    // Note: We omit the API key from the URL since we pass it via the Authorization header.
    const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    // Prepare the payload using the structure expected by Gemini 2.0 Flash
    const requestBody = {
      contents: [{
        parts: [
          { text: prompt }
        ]
      }],
      safetySettings: [{
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH"
      }],
      generationConfig: {
        stopSequences: ["Title"],
        temperature: 0.9,
        maxOutputTokens: 2000
      }
    };

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Function error (${response.status}): ${response.statusText || errorBody || 'No status text provided'}`);
    }

    const data = await response.json();
    // Assuming the API returns the generated text in data.output or similar structure.
    return {
      statusCode: 200,
      body: JSON.stringify({ output: data.output || "No response from Gemini." }),
    };
  } catch (error) {
    console.error("Error in Gemini function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
