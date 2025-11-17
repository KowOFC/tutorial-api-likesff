const axios = require('axios');
const Token = require('../models/Token');
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES, TOKEN_EXPIRY_HOURS } = require('../config/constants');

/**
 * Envia likes para um usuário do Free Fire
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const sendLikes = async (req, res) => {
  try {
    const { uid, region, accessToken } = req.body;
    const user = req.user;

    // Salva ou atualiza o token do usuário
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    
    await Token.findOneAndUpdate(
      { userId: user._id },
      { 
        accessToken, 
        expiresAt,
        lastUsed: new Date(),
      },
      { upsert: true, new: true }
    );

    // Constrói a URL da API externa
    const apiUrl = `${process.env.EXTERNAL_API_URL}?uid=${uid}&apikey=${user.apiKey}&region=${region}&access_token=${accessToken}`;

    // Faz a requisição para a API externa
    const response = await axios.get(apiUrl, {
      timeout: parseInt(process.env.API_TIMEOUT) || 10000,
      headers: {
        'User-Agent': 'FreeFire-Likes-API/1.0',
      },
    });

    const data = response.data;

    if (data.success) {
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LIKES_SENT,
        data: {
          uid,
          region,
          response: data,
        },
      });
    } else {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: data.message || ERROR_MESSAGES.EXTERNAL_API_ERROR,
      });
    }
  } catch (error) {
    console.error('Erro ao enviar likes:', error);

    // Trata diferentes tipos de erro
    if (error.code === 'ECONNABORTED') {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Timeout ao conectar com a API externa',
      });
    }

    if (error.response) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.response.data?.message || ERROR_MESSAGES.EXTERNAL_API_ERROR,
      });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${ERROR_MESSAGES.EXTERNAL_API_ERROR}: ${error.message}`,
    });
  }
};

/**
 * Recupera o token salvo do usuário
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getToken = async (req, res) => {
  try {
    const user = req.user;

    const token = await Token.findOne({ userId: user._id });

    if (!token) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.TOKEN_NOT_FOUND,
      });
    }

    // Verifica se o token está expirado
    if (token.isExpired()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Token expirado. Envie um novo token via /send-likes',
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.TOKEN_RETRIEVED,
      data: {
        accessToken: token.accessToken,
        expiresAt: token.expiresAt,
        lastUsed: token.lastUsed,
      },
    });
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Erro ao recuperar token',
    });
  }
};

module.exports = {
  sendLikes,
  getToken,
};
