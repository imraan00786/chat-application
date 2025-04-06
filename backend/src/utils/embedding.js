const axios = require('axios');

async function embedText(text) {
  const response = await axios.post(
    'https://api-inference.huggingface.co/embeddings/your-embedding-model',
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
      }
    }
  );

  return response.data.embedding;
}

module.exports = {
  embedText
};
