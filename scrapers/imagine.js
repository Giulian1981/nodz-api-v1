const axios = require('axios');

function getOptions(prompt) {
  return {
    method: 'POST',
    url: 'https://ai-image-generator3.p.rapidapi.com/generate',
    headers: {
      'x-rapidapi-key': '93ee576743msh92136099d158105p1de0d5jsnac4cd79b0421',
      'x-rapidapi-host': 'ai-image-generator3.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      prompt: prompt,
      page: 1
    }
  };
}

async function generateImage(prompt) {
  try {
    const options = getOptions(prompt);
    const response = await axios.request(options);
    return response.data;  // Retornando o resultado
  } catch (error) {
    console.error(error);
    throw error; // Lançando o erro para que possa ser tratado onde a função for chamada
  }
}

// Exportando a função generateImage
module.exports = { generateImage };