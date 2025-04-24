const axios = require('axios');

function kwaiDownload(link) {
  // Validando o parâmetro link
  if (!link || !link.startsWith('http')) {
    throw new Error('URL inválida fornecida');
  }

  const options = {
    method: 'GET',
    url: 'https://kwai-downloader1.p.rapidapi.com/data',
    params: {
      url: link
    },
    headers: {
      'x-rapidapi-key': '93ee576743msh92136099d158105p1de0d5jsnac4cd79b0421',  // Insira a sua chave RapidAPI
      'x-rapidapi-host': 'kwai-downloader1.p.rapidapi.com'
    }
  };

  // Retornando a Promise para que os dados possam ser acessados externamente
  return axios.request(options)
    .then(response => {
      console.log(response.data);
      return response.data;  // Retorna os dados em caso de sucesso
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error.message);
      throw error;  // Rejeita a Promise com o erro para tratamento externo
    });
}

// Exportando a função kwaiDownload
module.exports = { kwaiDownload };