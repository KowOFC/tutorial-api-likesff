#!/usr/bin/env node

/**
 * Script de setup inicial do projeto
 * Verifica dependências e configura o ambiente
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando setup do projeto...\n');

// Verifica se o Node.js está na versão correta
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));

if (majorVersion < 14) {
  console.error('❌ Node.js versão 14 ou superior é necessária');
  console.error(`   Versão atual: ${nodeVersion}`);
  process.exit(1);
}
console.log(`✓ Node.js ${nodeVersion} detectado`);

// Verifica se o arquivo .env existe
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('⚠ Arquivo .env não encontrado');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✓ Arquivo .env criado a partir de .env.example');
  } else {
    console.error('❌ Arquivo .env.example não encontrado');
    process.exit(1);
  }
} else {
  console.log('✓ Arquivo .env encontrado');
}

// Verifica se as dependências estão instaladas
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');

if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Instalando dependências...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✓ Dependências instaladas com sucesso');
  } catch (error) {
    console.error('❌ Erro ao instalar dependências');
    process.exit(1);
  }
} else {
  console.log('✓ Dependências já instaladas');
}

// Cria diretórios necessários
const directories = ['logs', 'public/images', 'public/assets'];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Diretório criado: ${dir}`);
  }
});

// Verifica conexão com MongoDB (opcional)
console.log('\n🔍 Verificando configurações...');

require('dotenv').config({ path: envPath });

if (!process.env.MONGO_URI) {
  console.warn('⚠ MONGO_URI não configurado no .env');
  console.warn('  Configure antes de iniciar o servidor');
}

if (!process.env.PORT) {
  console.warn('⚠ PORT não configurado, usando padrão 3000');
}

console.log('\n✅ Setup concluído com sucesso!');
console.log('\n📝 Próximos passos:');
console.log('   1. Configure o arquivo .env com suas credenciais');
console.log('   2. Execute: npm start');
console.log('   3. Acesse: http://localhost:3000\n');
