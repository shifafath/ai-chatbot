import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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"; // paste your key here
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.json({ reply: "Error: " + error.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
