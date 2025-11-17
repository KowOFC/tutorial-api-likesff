/**
 * Script principal do frontend
 * Gerencia a geração de API keys e interações do usuário
 */

// Elementos do DOM
const generateBtn = document.getElementById('generateBtn');
const resultSection = document.getElementById('resultSection');
const apiKeyValue = document.getElementById('apiKeyValue');
const copyBtn = document.getElementById('copyBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorAlert = document.getElementById('errorAlert');
const errorMessage = document.getElementById('errorMessage');

/**
 * Mostra o spinner de carregamento
 */
function showLoading() {
  loadingSpinner.style.display = 'block';
  resultSection.style.display = 'none';
  errorAlert.style.display = 'none';
  generateBtn.disabled = true;
}

/**
 * Esconde o spinner de carregamento
 */
function hideLoading() {
  loadingSpinner.style.display = 'none';
  generateBtn.disabled = false;
}

/**
 * Mostra mensagem de erro
 * @param {string} message - Mensagem de erro
 */
function showError(message) {
  errorMessage.textContent = message;
  errorAlert.style.display = 'block';
  resultSection.style.display = 'none';
  
  // Auto-hide após 5 segundos
  setTimeout(() => {
    errorAlert.style.display = 'none';
  }, 5000);
}

/**
 * Mostra o resultado com a API key gerada
 * @param {string} apiKey - API key gerada
 */
function showResult(apiKey) {
  apiKeyValue.value = apiKey;
  resultSection.style.display = 'block';
  errorAlert.style.display = 'none';
}

/**
 * Copia a API key para a área de transferência
 */
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(apiKeyValue.value);
    
    // Feedback visual
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="bi bi-check2"></i>';
    copyBtn.classList.add('btn-success');
    copyBtn.classList.remove('btn-outline-secondary');
    
    // Restaura o botão após 2 segundos
    setTimeout(() => {
      copyBtn.innerHTML = originalIcon;
      copyBtn.classList.remove('btn-success');
      copyBtn.classList.add('btn-outline-secondary');
    }, 2000);
  } catch (error) {
    console.error('Erro ao copiar:', error);
    showError('Erro ao copiar a API key. Copie manualmente.');
  }
}

/**
 * Gera uma nova API key
 */
async function generateApiKey() {
  showLoading();

  try {
    const response = await fetch('/api/generate-api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showResult(data.data.apiKey);
      
      // Salva no localStorage para referência futura
      saveApiKeyToHistory(data.data.apiKey, data.data.createdAt);
    } else {
      showError(data.message || 'Erro ao gerar API key. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    showError('Erro de conexão. Verifique sua internet e tente novamente.');
  } finally {
    hideLoading();
  }
}

/**
 * Salva a API key no histórico do localStorage
 * @param {string} apiKey - API key gerada
 * @param {string} createdAt - Data de criação
 */
function saveApiKeyToHistory(apiKey, createdAt) {
  try {
    const history = JSON.parse(localStorage.getItem('apiKeyHistory') || '[]');
    
    history.unshift({
      apiKey,
      createdAt,
      timestamp: new Date().toISOString(),
    });

    // Mantém apenas as últimas 10 chaves
    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem('apiKeyHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

/**
 * Carrega a última API key do histórico (se existir)
 */
function loadLastApiKey() {
  try {
    const history = JSON.parse(localStorage.getItem('apiKeyHistory') || '[]');
    
    if (history.length > 0) {
      const lastKey = history[0];
      // Mostra a última chave gerada
      showResult(lastKey.apiKey);
    }
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
  }
}

// Event Listeners
generateBtn.addEventListener('click', generateApiKey);
copyBtn.addEventListener('click', copyToClipboard);

// Permite gerar API key com Enter
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !generateBtn.disabled) {
    generateApiKey();
  }
});

// Carrega a última API key ao carregar a página
document.addEventListener('DOMContentLoaded', loadLastApiKey);

// Adiciona animação de hover nos cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});
