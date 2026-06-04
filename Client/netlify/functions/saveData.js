// client/netlify/functions/saveData.js

exports.handler = async (event) => {
  // 1. Paste your exact Google Apps Script Web App URL here
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyiG20gui8tWHfWkMesIPeiRJL67-uFxzlZ33-yfvOERghDMZM1vjSHv6YfMJiv2H-mdA/exec";

  try {
    // 2. Extract all the data your React app sent via the URL
    const params = new URLSearchParams(event.queryStringParameters).toString();
    const requestUrl = `${GOOGLE_SCRIPT_URL}?${params}`;

    // 3. Make the server-to-server request to Google (Ad blockers can't stop this!)
    const response = await fetch(requestUrl, {
      method: "GET",
    });

    // 4. Tell the React app it was successful
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Data saved securely." }),
    };

  } catch (error) {
    console.error("Serverless Function Error:", error);
    
    // Tell the React app it failed
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Failed to connect to database." }),
    };
  }
};