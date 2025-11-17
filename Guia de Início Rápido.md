# Guia de Início Rápido

Este guia irá te ajudar a colocar a API rodando em menos de 5 minutos.

## ⚡ Instalação Rápida

### 1. Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **MongoDB** (rodando localmente ou em nuvem)
- **npm** (vem com Node.js)

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

O arquivo `.env` já está criado. Edite-o se necessário:

```bash
nano .env
```

Configuração padrão (funciona localmente):

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/freefire-likes
EXTERNAL_API_URL=https://getvyenx.cloud/free-fire/send-likes
API_TIMEOUT=10000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Iniciar MongoDB (se local)

**Linux/Mac:**

```bash
sudo systemctl start mongod
```

**Windows:**

```bash
net start MongoDB
```

**Docker:**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Iniciar o Servidor

```bash
npm start
```

Você verá:

```
========================================
🚀 Servidor iniciado com sucesso!
📡 Porta: 3000
🌍 Ambiente: development
🔗 URL: http://localhost:3000
========================================
```

### 6. Acessar a Interface Web

Abra seu navegador e acesse:

```
http://localhost:3000
```

## 🎯 Testando a API

### Opção 1: Interface Web

1. Acesse `http://localhost:3000`
2. Clique em "Gerar Nova API Key"
3. Copie a chave gerada
4. Use a chave para fazer requisições

### Opção 2: cURL

**Gerar API Key:**

```bash
curl -X POST http://localhost:3000/api/generate-api-key
```

**Enviar Likes:**

```bash
curl -X POST http://localhost:3000/api/send-likes \
  -H "Content-Type: application/json" \
  -H "x-api-key: SUA_API_KEY_AQUI" \
  -d '{
    "uid": "123456789",
    "region": "BR",
    "accessToken": "seu_token_aqui"
  }'
```

### Opção 3: Postman

1. Importe a coleção (ou crie manualmente)
2. Gere uma API key via `POST /api/generate-api-key`
3. Use a key no header `x-api-key` para outras requisições

## 🐛 Problemas Comuns

### MongoDB não conecta

**Erro:** `MongoDB desconectado`

**Solução:**

1. Verifique se o MongoDB está rodando:
   ```bash
   sudo systemctl status mongod
   ```

2. Verifique a URI no `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/freefire-likes
   ```

### Porta já em uso

**Erro:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solução:**

1. Mude a porta no `.env`:
   ```env
   PORT=3001
   ```

2. Ou mate o processo na porta 3000:
   ```bash
   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

### Dependências não instaladas

**Erro:** `Cannot find module 'express'`

**Solução:**

```bash
npm install
```

## 📚 Próximos Passos

- Leia a [Documentação Completa](./README.md)
- Consulte a [API Documentation](./API_DOCUMENTATION.md)
- Explore o código nos diretórios:
  - `controllers/` - Lógica de negócio
  - `routes/` - Definição de rotas
  - `models/` - Schemas do MongoDB
  - `middleware/` - Validação e autenticação

## 🚀 Deploy em Produção

### Configurações Recomendadas

1. **Mude para produção no `.env`:**
   ```env
   NODE_ENV=production
   ```

2. **Use MongoDB em nuvem:**
   ```env
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/freefire
   ```

3. **Configure CORS:**
   ```env
   ALLOWED_ORIGINS=https://seudominio.com
   ```

4. **Use PM2 para gerenciar o processo:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name freefire-api
   pm2 startup
   pm2 save
   ```

## 💡 Dicas

- Use `npm run dev` para desenvolvimento (auto-reload)
- Monitore logs com `pm2 logs` em produção
- Faça backup regular do MongoDB
- Configure SSL/TLS em produção
- Use variáveis de ambiente para dados sensíveis

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do servidor
2. Consulte a documentação completa
3. Abra uma issue no repositório

---

**Pronto!** Sua API está rodando e pronta para uso. 🎉
