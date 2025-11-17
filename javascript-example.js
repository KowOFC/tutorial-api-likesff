/**
 * Exemplo de uso da API de Likes Free Fire em JavaScript
 * Este exemplo mostra como gerar uma API key e enviar likes
 */

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Gera uma nova API key
 * @returns {Promise<string>} API key gerada
 */
async function generateApiKey() {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-api-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('✓ API Key gerada:', data.data.apiKey);
      return data.data.apiKey;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('✗ Erro ao gerar API key:', error.message);
    throw error;
  }
}

/**
 * Envia likes para um usuário do Free Fire
 * @param {string} apiKey - API key para autenticação
 * @param {string} uid - UID do usuário
 * @param {string} region - Região do servidor
 * @param {string} accessToken - Token de acesso
 * @returns {Promise<Object>} Resposta da API
 */
async function sendLikes(apiKey, uid, region, accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/send-likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        uid,
        region,
        accessToken,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✓ Likes enviados com sucesso!');
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('✗ Erro ao enviar likes:', error.message);
    throw error;
  }
}

/**
 * Recupera o token salvo
 * @param {string} apiKey - API key para autenticação
 * @returns {Promise<string>} Token de acesso salvo
 */
async function getToken(apiKey) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-token`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('✓ Token recuperado:', data.data.accessToken);
      return data.data.accessToken;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('✗ Erro ao recuperar token:', error.message);
    throw error;
  }
}

/**
 * Verifica o status da API
 * @returns {Promise<Object>} Status da API
 */
async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();

    if (data.success) {
      console.log('✓ API está funcionando');
      console.log('  Status:', data.status);
      console.log('  Uptime:', data.uptime, 'segundos');
      return data;
    } else {
      throw new Error('API não está respondendo corretamente');
    }
  } catch (error) {
    console.error('✗ Erro ao verificar status:', error.message);
    throw error;
  }
}

// Exemplo de uso completo
async function main() {
  console.log('=== Exemplo de Uso da API ===\n');

  // 1. Verificar se a API está funcionando
  console.log('1. Verificando status da API...');
  await checkHealth();
  console.log();

  // 2. Gerar uma API key
  console.log('2. Gerando API key...');
  const apiKey = await generateApiKey();
  console.log();

  // 3. Enviar likes
  console.log('3. Enviando likes...');
  await sendLikes(
    apiKey,
    '123456789',        // UID do usuário
    'BR',               // Região
    'seu-token-aqui'    // Token de acesso
  );
  console.log();

  // 4. Recuperar token salvo
  console.log('4. Recuperando token salvo...');
  await getToken(apiKey);
  console.log();

  console.log('=== Exemplo concluído! ===');
}

// Executa o exemplo se este arquivo for executado diretamente
if (require.main === module) {
  main().catch(error => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
}

// Exporta as funções para uso em outros módulos
module.exports = {
  generateApiKey,
  sendLikes,
  getToken,
  checkHealth,
};
