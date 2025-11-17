const User = require('../models/User');
const { generateApiKey, generateAnonymousUsername, generateTemporaryEmail } = require('../utils/keyGenerator');
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../config/constants');

/**
 * Gera uma nova API key anônima
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const generateNewApiKey = async (req, res) => {
  try {
    const apiKey = generateApiKey();
    const username = generateAnonymousUsername();
    const email = generateTemporaryEmail();

    const user = new User({
      username,
      email,
      password: 'temp-password', // Senha dummy (não usada para autenticação)
      apiKey,
    });

    await user.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.API_KEY_GENERATED,
      data: {
        apiKey,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Erro ao gerar API key:', error);
    
    // Trata erro de duplicação (caso raro)
    if (error.code === 11000) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Erro ao gerar chave única. Tente novamente.',
      });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.GENERATE_KEY_ERROR,
    });
  }
};

module.exports = {
  generateNewApiKey,
};
