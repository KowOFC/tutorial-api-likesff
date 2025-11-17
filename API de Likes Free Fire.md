# API de Likes Free Fire

Uma API moderna e robusta para envio de likes no Free Fire, desenvolvida com **Node.js puro** (sem TypeScript), seguindo as melhores práticas de desenvolvimento e arquitetura profissional.

## 🚀 Características

- ✅ **Node.js Puro** - Sem TypeScript, apenas JavaScript
- 🔐 **Autenticação via API Key** - Sistema seguro de autenticação
- 🎨 **Interface Web Moderna** - Frontend responsivo com Bootstrap 5
- 📊 **Arquitetura Profissional** - Estrutura MVC organizada
- 🛡️ **Segurança** - Helmet, CORS, Rate Limiting
- 📝 **Logging** - Morgan para registro de requisições
- 🗄️ **MongoDB** - Banco de dados NoSQL com Mongoose
- ⚡ **Performance** - Otimizado com índices e cache
- 🔄 **Graceful Shutdown** - Encerramento seguro do servidor
- 🧪 **Testes** - Jest com cobertura de código
- 📚 **Documentação Completa** - Guias e exemplos

## 📁 Estrutura do Projeto

```
freefire-likes-api/
├── src/                    # Código fonte
│   ├── config/            # Configurações
│   ├── controllers/       # Lógica de negócio
│   ├── middleware/        # Middlewares
│   ├── models/            # Schemas MongoDB
│   ├── routes/            # Rotas da API
│   ├── services/          # Serviços externos
│   └── utils/             # Utilitários
├── tests/                 # Testes automatizados
│   ├── unit/             # Testes unitários
│   ├── integration/      # Testes de integração
│   └── fixtures/         # Dados de teste
├── docs/                  # Documentação
│   ├── api/              # Docs da API
│   ├── guides/           # Guias
│   └── examples/         # Exemplos de código
├── scripts/               # Scripts utilitários
├── public/                # Frontend
│   ├── css/              # Estilos
│   ├── js/               # JavaScript
│   └── index.html        # Página principal
├── logs/                  # Arquivos de log
└── server.js              # Servidor principal
```

> 📖 Veja a [estrutura completa](./docs/guides/PROJECT_STRUCTURE.md) para mais detalhes.

## 🛠️ Instalação

### Pré-requisitos

- Node.js 14+ instalado
- MongoDB instalado e rodando
- npm ou yarn

### Instalação Rápida

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd freefire-likes-api

# Execute o setup automático
npm run setup

# Inicie o servidor
npm start
```

> 📖 Veja o [guia de início rápido](./docs/guides/QUICK_START.md) para instruções detalhadas.

### Configuração Manual

1. **Instale as dependências**

```bash
npm install
```

2. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Inicie o servidor**

```bash
npm start
```

## 📖 Uso da API

### Interface Web

Acesse `http://localhost:3000` para usar a interface web e gerar API keys.

### Endpoints Principais

#### 1. Gerar API Key

```bash
POST /api/generate-api-key
```

**Resposta:**
```json
{
  "success": true,
  "message": "API key gerada com sucesso",
  "data": {
    "apiKey": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Enviar Likes

```bash
POST /api/send-likes
Headers: x-api-key: sua-api-key
Body: {
  "uid": "123456789",
  "region": "BR",
  "accessToken": "seu_token"
}
```

#### 3. Recuperar Token

```bash
GET /api/get-token
Headers: x-api-key: sua-api-key
```

#### 4. Health Check

```bash
GET /api/health
```

> 📖 Veja a [documentação completa da API](./docs/api/API_DOCUMENTATION.md) para todos os endpoints.

## 🌍 Regiões Válidas

- `BR` - Brasil
- `NA` - América do Norte
- `SA` - América do Sul
- `EU` - Europa
- `AS` - Ásia
- `OC` - Oceania

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch

# Apenas testes unitários
npm run test:unit

# Apenas testes de integração
npm run test:integration
```

## 📝 Scripts Disponíveis

```bash
npm start              # Inicia o servidor
npm run dev            # Modo desenvolvimento (auto-reload)
npm run setup          # Setup inicial do projeto
npm test               # Executa testes
npm run lint           # Verifica código
npm run lint:fix       # Corrige problemas automaticamente
npm run format         # Formata código com Prettier
npm run clean:logs     # Limpa logs antigos
npm run backup:db      # Faz backup do MongoDB
npm run pm2:start      # Inicia com PM2
```

## 🔒 Segurança

A API implementa várias camadas de segurança:

- **Helmet** - Proteção contra vulnerabilidades comuns
- **CORS** - Controle de acesso entre origens
- **Rate Limiting** - Limite de 100 requisições por 15 minutos
- **Validação de Dados** - Validação rigorosa de entrada
- **API Key Authentication** - Autenticação via chave única

## 📚 Documentação

- [Guia de Início Rápido](./docs/guides/QUICK_START.md)
- [Documentação da API](./docs/api/API_DOCUMENTATION.md)
- [Estrutura do Projeto](./docs/guides/PROJECT_STRUCTURE.md)
- [Guia de Contribuição](./docs/guides/CONTRIBUTING.md)
- [Exemplos de Código](./docs/examples/)

## 💡 Exemplos

### JavaScript

```javascript
const response = await fetch('http://localhost:3000/api/generate-api-key', {
  method: 'POST'
});
const { data } = await response.json();
console.log(data.apiKey);
```

> 📖 Veja [mais exemplos](./docs/examples/) em JavaScript e Python.

## 🚀 Deploy em Produção

### Com PM2

```bash
npm install -g pm2
npm run pm2:start
pm2 save
pm2 startup
```

### Configurações Recomendadas

1. Configure `NODE_ENV=production` no `.env`
2. Use MongoDB em nuvem (MongoDB Atlas)
3. Configure CORS para seu domínio
4. Use HTTPS com certificado SSL
5. Configure backup automático do banco

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [guia de contribuição](./docs/guides/CONTRIBUTING.md) antes de enviar um Pull Request.

### Processo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feat/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feat/nova-feature`)
5. Abra um Pull Request

## 📊 Melhorias Implementadas

Esta versão inclui melhorias significativas:

1. ✅ **Arquitetura Modular** - Separação clara de responsabilidades
2. ✅ **Testes Automatizados** - Jest com cobertura de código
3. ✅ **Scripts Utilitários** - Setup, backup, limpeza
4. ✅ **Documentação Completa** - Guias e exemplos
5. ✅ **Configuração Profissional** - ESLint, Prettier, EditorConfig
6. ✅ **Logging Avançado** - Morgan com rotação de logs
7. ✅ **Estrutura Organizada** - Pastas bem definidas
8. ✅ **Frontend Aprimorado** - Interface moderna e responsiva
9. ✅ **Exemplos de Uso** - JavaScript e Python
10. ✅ **CI/CD Ready** - Preparado para integração contínua

## 🐛 Troubleshooting

### MongoDB não conecta

```bash
# Verifique se está rodando
sudo systemctl status mongod

# Inicie se necessário
sudo systemctl start mongod
```

### Porta já em uso

```bash
# Mude a porta no .env
PORT=3001
```

### Dependências não instaladas

```bash
# Reinstale
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando Node.js puro.

## 🙏 Agradecimentos

- Express.js pela framework incrível
- MongoDB pela flexibilidade
- Comunidade Node.js

---

**Nota:** Esta é uma API educacional. Use com responsabilidade e respeite os termos de serviço do Free Fire.

## 📞 Suporte

- 📧 Email: [seu-email]
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/freefire-likes-api/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/seu-usuario/freefire-likes-api/discussions)

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!
