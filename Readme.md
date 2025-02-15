# ai-for-legacy-browsers

brings state-of-the-art AI (via Google Gemini API) to legacy devices with a simple chat interface.

## Features
- **Simplest UI:** Lightweight, minimal design optimized for older devices.
- **Secure API Calls:** Uses Netlify Functions and environment variables to call the Gemini API without exposing your key.
- **Legacy Support:** Transpiled JavaScript with polyfills for compatibility (e.g. iOS 12 and earlier).

## Project Structure
```
ai-for-legacy-browsers/
├── netlify/functions/gemini.js   # Serverless function calling the Gemini API
├── index.html                    # Chat interface and client code
├── package.json                  # Dependencies (e.g., node-fetch)
└── .gitignore                    # Excludes sensitive files (e.g., API keys)
```

## Setup & Deployment
1. **Clone the Repo:**
   ```bash
   git clone https://github.com/yourusername/ai-for-legacy-browsers.git
   cd ai-for-legacy-browsers
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Environment Variable:**
   In Netlify, add `GEMINI_API_KEY` under your site’s environment settings.
4. **Deploy:**
   Push to GitHub and let Netlify automatically deploy your site and functions.

## How It Works
- **Client-Side:** `index.html` sends user messages to the Netlify function.
- **Server-Side:** `netlify/functions/gemini.js` securely calls the Gemini API using the Netlify environment variable.

## Contributing
Contributions are welcome! Please open a pull request or issue.

## License
MIT License
