const User = require('../models/User');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');

/**
 * Middleware para autenticar requisições via API key
 * Verifica se a API key fornecida no header x-api-key é válida
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.header('x-api-key');

    // Verifica se a API key foi fornecida
    if (!apiKey) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.API_KEY_REQUIRED,
      });
    }

    // Busca o usuário pela API key
    const user = await User.findOne({ apiKey, isActive: true });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.API_KEY_INVALID,
      });
    }

    // Anexa o usuário ao objeto request para uso posterior
    req.user = user;
    
    // Incrementa o contador de requisições (não bloqueia a resposta)
    user.incrementRequestCount().catch(err => {
      console.error('Erro ao incrementar contador:', err);
    });

    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Erro interno no servidor',
    });
  }
};

module.exports = { authenticateApiKey };
