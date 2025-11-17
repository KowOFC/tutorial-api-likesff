const mongoose = require('mongoose');

/**
 * Schema do token de acesso
 * Armazena tokens de acesso dos usuários para a API externa
 */
const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    lastUsed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para melhorar performance de busca por userId
tokenSchema.index({ userId: 1 });

// Índice TTL para remover tokens expirados automaticamente
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Método para verificar se o token está expirado
tokenSchema.methods.isExpired = function() {
  return this.expiresAt < new Date();
};

// Método para atualizar o último uso
tokenSchema.methods.updateLastUsed = async function() {
  this.lastUsed = new Date();
  return this.save();
};

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
