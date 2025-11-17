/**
 * Servidor principal da API de Likes Free Fire
 * Implementação em Node.js puro sem TypeScript
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const { connectDatabase, closeDatabase } = require('./src/config/database');
const apiRoutes = require('./src/routes/api');
const { errorHandler } = require('./src/middleware/validation');

// Inicialização do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Garante que o diretório de logs existe
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Configuração de Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limite de requisições
  message: {
    success: false,
    message: 'Muitas requisições. Tente novamente mais tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares Globais
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  // Em produção, salva logs em arquivo
  const accessLogStream = fs.createWriteStream(
    path.join(logsDir, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
}

// Rate limiting para rotas da API
app.use('/api/', limiter);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true,
}));

// Rotas da API
app.use('/api', apiRoutes);

// Rota raiz redireciona para index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota 404 para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.path,
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

/**
 * Inicia o servidor e conecta ao banco de dados
 */
const startServer = async () => {
  try {
    // Conecta ao banco de dados
    await connectDatabase();

    // Inicia o servidor
    const server = app.listen(PORT, () => {
      console.log('\n========================================');
      console.log('🚀 Servidor iniciado com sucesso!');
      console.log(`📡 Porta: ${PORT}`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log(`📁 Logs: ${logsDir}`);
      console.log('========================================\n');
    });

    // Tratamento de sinais de encerramento
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} recebido. Encerrando servidor...`);
      
      server.close(async () => {
        console.log('✓ Servidor HTTP fechado');
        await closeDatabase();
        console.log('✓ Aplicação encerrada com sucesso\n');
        process.exit(0);
      });

      // Força o encerramento após 10 segundos
      setTimeout(() => {
        console.error('⚠ Encerramento forçado após timeout');
        process.exit(1);
      }, 10000);
    };

    // Listeners para sinais de encerramento
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Tratamento de erros não capturados
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection:', reason);
      console.error('Promise:', promise);
    });

    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Inicia o servidor
startServer();

module.exports = app;
