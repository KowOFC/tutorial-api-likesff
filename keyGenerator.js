const crypto = require('crypto');

/**
 * Gera uma API key única usando UUID v4
 * @returns {string} API key gerada
 */
const generateApiKey = () => {
  return crypto.randomUUID();
};

/**
 * Gera um username anônimo único baseado no timestamp
 * @returns {string} Username gerado
 */
const generateAnonymousUsername = () => {
  return `anon-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
};

/**
 * Gera um email temporário único
 * @returns {string} Email gerado
 */
const generateTemporaryEmail = () => {
  return `anon-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@temp.local`;
};

module.exports = {
  generateApiKey,
  generateAnonymousUsername,
  generateTemporaryEmail,
};
