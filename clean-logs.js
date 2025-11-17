#!/usr/bin/env node

/**
 * Script para limpar arquivos de log antigos
 * Remove logs com mais de X dias
 */

const fs = require('fs');
const path = require('path');

const DAYS_TO_KEEP = process.env.LOG_RETENTION_DAYS || 7;
const LOGS_DIR = path.join(__dirname, '..', 'logs');

console.log(`🧹 Limpando logs com mais de ${DAYS_TO_KEEP} dias...\n`);

if (!fs.existsSync(LOGS_DIR)) {
  console.log('⚠ Diretório de logs não encontrado');
  process.exit(0);
}

const now = Date.now();
const maxAge = DAYS_TO_KEEP * 24 * 60 * 60 * 1000; // dias em milissegundos

let removedCount = 0;
let totalSize = 0;

fs.readdirSync(LOGS_DIR).forEach(file => {
  const filePath = path.join(LOGS_DIR, file);
  const stats = fs.statSync(filePath);

  if (stats.isFile()) {
    const age = now - stats.mtimeMs;

    if (age > maxAge) {
      const size = stats.size;
      fs.unlinkSync(filePath);
      removedCount++;
      totalSize += size;
      console.log(`✓ Removido: ${file} (${(size / 1024).toFixed(2)} KB)`);
    }
  }
});

if (removedCount === 0) {
  console.log('✓ Nenhum log antigo encontrado');
} else {
  console.log(`\n✅ ${removedCount} arquivo(s) removido(s)`);
  console.log(`📊 Espaço liberado: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}
