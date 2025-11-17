const mongoose = require('mongoose');

/**
 * Schema do usuário
 * Armazena informações de usuários anônimos gerados automaticamente
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    requestCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para melhorar performance de busca por API key
userSchema.index({ apiKey: 1 });

// Método para incrementar contador de requisições
userSchema.methods.incrementRequestCount = async function() {
  this.requestCount += 1;
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
