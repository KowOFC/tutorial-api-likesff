#!/usr/bin/env node

/**
 * Script para fazer backup do banco de dados MongoDB
 * Exporta dados em formato JSON
 */

require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);

console.log('💾 Iniciando backup do banco de dados...\n');

// Cria diretório de backup se não existir
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log('✓ Diretório de backup criado');
}

// Extrai informações da URI do MongoDB
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI não configurado no .env');
  process.exit(1);
}

try {
  // Extrai o nome do banco de dados da URI
  const dbName = mongoUri.split('/').pop().split('?')[0];
  
  console.log(`📦 Fazendo backup do banco: ${dbName}`);
  console.log(`📁 Destino: ${backupPath}\n`);

  // Executa mongodump
  const command = `mongodump --uri="${mongoUri}" --out="${backupPath}"`;
  
  execSync(command, { stdio: 'inherit' });

  // Calcula tamanho do backup
  const getDirectorySize = (dirPath) => {
    let size = 0;
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    });
    
    return size;
  };

  const backupSize = getDirectorySize(backupPath);

  console.log('\n✅ Backup concluído com sucesso!');
  console.log(`📊 Tamanho: ${(backupSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📍 Local: ${backupPath}\n`);

  // Remove backups antigos (mantém apenas os últimos 5)
  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.startsWith('backup-'))
    .map(file => ({
      name: file,
      path: path.join(BACKUP_DIR, file),
      time: fs.statSync(path.join(BACKUP_DIR, file)).mtimeMs
    }))
    .sort((a, b) => b.time - a.time);

  if (backups.length > 5) {
    console.log('🧹 Removendo backups antigos...');
    backups.slice(5).forEach(backup => {
      fs.rmSync(backup.path, { recursive: true, force: true });
      console.log(`✓ Removido: ${backup.name}`);
    });
  }

} catch (error) {
  console.error('\n❌ Erro ao fazer backup:', error.message);
  console.error('\n💡 Dica: Certifique-se de que o mongodump está instalado');
  console.error('   Instale com: sudo apt install mongodb-database-tools');
  process.exit(1);
}
