const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
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
    console.log("Full Gemini API response:", data);

    // Extracting the response text correctly
    let generatedText = "No response from Gemini.";
    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        generatedText = candidate.content.parts.map(part => part.text).join(" ");
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ output: generatedText })
    };

  } catch (error) {
    console.error("Error in Gemini function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
