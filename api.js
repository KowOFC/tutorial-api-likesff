const express = require('express');
const router = express.Router();

const { generateNewApiKey } = require('../controllers/apiKeyController');
const { sendLikes, getToken } = require('../controllers/likesController');
const { authenticateApiKey } = require('../middleware/auth');
const { validateSendLikes } = require('../middleware/validation');

/**
 * @route   POST /api/generate-api-key
 * @desc    Gera uma nova API key anônima
 * @access  Public
 */
router.post('/generate-api-key', generateNewApiKey);

/**
 * @route   POST /api/send-likes
 * @desc    Envia likes para um usuário do Free Fire
 * @access  Private (requer API key)
 */
router.post('/send-likes', authenticateApiKey, validateSendLikes, sendLikes);

/**
 * @route   GET /api/get-token
 * @desc    Recupera o token salvo do usuário
 * @access  Private (requer API key)
 */
router.get('/get-token', authenticateApiKey, getToken);

/**
 * @route   GET /api/health
 * @desc    Verifica o status da API
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
