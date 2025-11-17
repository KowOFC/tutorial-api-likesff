const mongoose = require('mongoose');

/**
 * Conecta ao MongoDB usando a URI do arquivo .env
 * @returns {Promise<void>}
 */
const connectDatabase = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log('✓ MongoDB conectado com sucesso');
    
    // Event listeners para monitorar a conexão
    mongoose.connection.on('error', (err) => {
      console.error('✗ Erro na conexão MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠ MongoDB desconectado');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB reconectado');
    });

  } catch (error) {
    console.error('✗ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

/**
 * Fecha a conexão com o MongoDB de forma segura
 * @returns {Promise<void>}
 */
const closeDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log('✓ Conexão com MongoDB fechada');
  } catch (error) {
    console.error('✗ Erro ao fechar conexão:', error.message);
  }
};

module.exports = { connectDatabase, closeDatabase };
