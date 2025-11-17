const { HTTP_STATUS, ERROR_MESSAGES, VALID_REGIONS } = require('../config/constants');

/**
 * Valida os dados de entrada para envio de likes
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const validateSendLikes = (req, res, next) => {
  const { uid, region, accessToken } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!uid || !region || !accessToken) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: ERROR_MESSAGES.MISSING_FIELDS,
      required: ['uid', 'region', 'accessToken'],
    });
  }

  // Valida se o UID é numérico
  if (!/^\d+$/.test(uid)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_UID,
    });
  }

  // Valida se a região é válida
  if (!VALID_REGIONS.includes(region.toUpperCase())) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_REGION,
      validRegions: VALID_REGIONS,
    });
  }

  // Normaliza a região para uppercase
  req.body.region = region.toUpperCase();

  next();
};

/**
 * Middleware genérico de tratamento de erros
 * @param {Error} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado:', err);

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Erro interno no servidor';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  validateSendLikes,
  errorHandler,
};
