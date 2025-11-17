/**
 * Constantes da aplicação
 */

const VALID_REGIONS = ['BR', 'NA', 'SA', 'EU', 'AS', 'OC'];

const TOKEN_EXPIRY_HOURS = 24;

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  API_KEY_REQUIRED: 'API key é obrigatória no header x-api-key',
  API_KEY_INVALID: 'API key inválida ou não encontrada',
  MISSING_FIELDS: 'Campos obrigatórios ausentes',
  INVALID_UID: 'UID deve conter apenas números',
  INVALID_REGION: 'Região inválida. Regiões válidas: BR, NA, SA, EU, AS, OC',
  TOKEN_NOT_FOUND: 'Nenhum token salvo para este usuário',
  EXTERNAL_API_ERROR: 'Erro ao comunicar com a API externa',
  GENERATE_KEY_ERROR: 'Erro ao gerar API key',
};

const SUCCESS_MESSAGES = {
  LIKES_SENT: 'Likes enviados com sucesso',
  API_KEY_GENERATED: 'API key gerada com sucesso',
  TOKEN_RETRIEVED: 'Token recuperado com sucesso',
};

module.exports = {
  VALID_REGIONS,
  TOKEN_EXPIRY_HOURS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
