const axios = require('axios');
const Message = require('../models/message'); // assumes Message model
const { embedText } = require('../utils/embedding');

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/your-model';
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function storeMessageWithEmbedding(message) {
  const embedding = await embedText(message.content);
  message.vector = embedding;
  await message.save();
}

async function getContextualMessages(queryText, groupId) {
  const queryEmbedding = await embedText(queryText);

  const similarMessages = await Message.aggregate([
    {
      $search: {
        index: 'vector_index',
        knnBeta: {
          vector: queryEmbedding,
          k: 3,
          path: 'vector'
        }
      }
    },
    { $match: { groupId } },
    { $project: { content: 1, _id: 0 } }
  ]);

  return similarMessages.map(msg => msg.content);
}

async function getSmartReplies(messageContent, groupId) {
  const contextMessages = await getContextualMessages(messageContent, groupId);
  const prompt = `
You are a smart chat assistant. Based on this context:
${contextMessages.join('\n')}
Suggest 3 short and relevant replies to: "${messageContent}"
Return them as a JSON array of strings.
`;

  const response = await axios.post(
    HUGGINGFACE_API_URL,
    { inputs: prompt },
    {
      headers: { Authorization: `Bearer ${HF_API_KEY}` },
      timeout: 10000,
    }
  );

  try {
    const suggestions = JSON.parse(response.data[0].generated_text || '[]');
    return Array.isArray(suggestions) ? suggestions : [];
  } catch (e) {
    console.error('Error parsing LLM response:', e);
    return [];
  }
}

module.exports = {
  storeMessageWithEmbedding,
  getSmartReplies,
};
