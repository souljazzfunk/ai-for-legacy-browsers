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

    // Include API key in URL query parameter
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

    // Adjust extraction logic based on the response structure.
    // For example, if the response contains a "candidates" array, return the text of the first candidate.
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].text) {
      return {
        statusCode: 200,
        body: JSON.stringify({ output: data.candidates[0].text })
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ output: "No response from Gemini." })
    };

  } catch (error) {
    console.error("Error in Gemini function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
