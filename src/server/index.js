const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.openai_key;

app.post('/ask', async (req, res) => {
  const userInput = req.body.message;
  if (userInput) {
    try {
      const response = await axios.post(process.env.openai_url, {
        prompt: userInput,
        max_tokens: 300,
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
  } else {
    res.status(400).json({ error: 'No message provided' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});