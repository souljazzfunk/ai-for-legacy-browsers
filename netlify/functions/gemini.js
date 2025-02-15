// netlify/functions/gemini.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const GEMINI_ENDPOINT = 'https://api.googleai.dev/gemini/v1.5/flash'; // Update if needed

    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The API key is securely injected via Netlify's environment variables
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 100 // Adjust as needed
      })
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: response.statusText }),
      };
    }

    const data = await response.json();
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
