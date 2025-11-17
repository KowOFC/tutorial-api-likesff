# Estrutura do Projeto

Este documento descreve a organização de pastas e arquivos do projeto.

## 📁 Visão Geral

```
freefire-likes-api/
├── src/                    # Código fonte principal
├── tests/                  # Testes automatizados
├── docs/                   # Documentação
├── scripts/                # Scripts utilitários
├── public/                 # Arquivos estáticos (frontend)
├── logs/                   # Arquivos de log
└── [arquivos de config]    # Configurações na raiz
```

## 🗂️ Estrutura Detalhada

### `/src` - Código Fonte

```
src/
├── config/              # Configurações da aplicação
│   ├── constants.js     # Constantes globais
│   └── database.js      # Configuração do MongoDB
│
├── controllers/         # Lógica de negócio
│   ├── apiKeyController.js   # Geração de API keys
│   └── likesController.js    # Envio de likes
│
├── middleware/          # Middlewares Express
│   ├── auth.js          # Autenticação via API key
│   └── validation.js    # Validação de dados
│
├── models/              # Schemas MongoDB
│   ├── User.js          # Model de usuário
│   └── Token.js         # Model de token
│
├── routes/              # Definição de rotas
│   └── api.js           # Rotas da API
│
├── services/            # Serviços externos (futuro)
│   └── [vazio]
│
└── utils/               # Funções utilitárias
    └── keyGenerator.js  # Geração de chaves
```

**Responsabilidades:**

- **config/**: Configurações centralizadas (banco, constantes)
- **controllers/**: Lógica de negócio e manipulação de dados
- **middleware/**: Interceptadores de requisições (auth, validação)
- **models/**: Schemas e modelos do MongoDB
- **routes/**: Definição de endpoints da API
- **services/**: Integrações com APIs externas
- **utils/**: Funções auxiliares reutilizáveis

### `/tests` - Testes

```
tests/
├── unit/                # Testes unitários
│   └── keyGenerator.test.js
│
├── integration/         # Testes de integração
│   └── api.test.js
│
└── fixtures/            # Dados de teste
    └── users.json
```

**Tipos de Teste:**

- **Unit**: Testam funções isoladas
- **Integration**: Testam fluxos completos
- **Fixtures**: Dados mock para testes

### `/docs` - Documentação

```
docs/
├── api/                 # Documentação da API
│   └── API_DOCUMENTATION.md
│
├── guides/              # Guias e tutoriais
│   ├── QUICK_START.md
│   ├── CONTRIBUTING.md
│   └── PROJECT_STRUCTURE.md
│
└── examples/            # Exemplos de código
    ├── javascript-example.js
    └── python-example.py
```

**Conteúdo:**

- **api/**: Referência completa da API
- **guides/**: Tutoriais e guias de uso
- **examples/**: Código de exemplo em várias linguagens

### `/scripts` - Scripts Utilitários

```
scripts/
├── setup.js         # Setup inicial do projeto
├── clean-logs.js    # Limpeza de logs antigos
└── backup-db.js     # Backup do banco de dados
```

**Scripts Disponíveis:**

```bash
npm run setup        # Configuração inicial
npm run clean:logs   # Limpa logs antigos
npm run backup:db    # Faz backup do MongoDB
```

### `/public` - Frontend

```
public/
├── css/             # Estilos CSS
│   └── styles.css
│
├── js/              # JavaScript do frontend
│   └── script.js
│
├── images/          # Imagens
│   └── [vazio]
│
├── assets/          # Outros assets
│   └── [vazio]
│
└── index.html       # Página principal
```

**Organização:**

- Arquivos estáticos servidos pelo Express
- CSS e JS separados em pastas
- Assets organizados por tipo

### `/logs` - Arquivos de Log

```
logs/
└── access.log       # Logs de acesso (produção)
```

**Gerenciamento:**

- Logs são criados automaticamente
- Rotação via script `clean-logs.js`
- Ignorados pelo Git

### Arquivos na Raiz

```
.
├── server.js              # Servidor principal
├── package.json           # Dependências e scripts
├── .env                   # Variáveis de ambiente (não commitado)
├── .env.example           # Template do .env
├── .gitignore             # Arquivos ignorados pelo Git
├── .eslintrc.json         # Configuração ESLint
├── .prettierrc.json       # Configuração Prettier
├── .editorconfig          # Configuração do editor
├── jest.config.js         # Configuração Jest
└── README.md              # Documentação principal
```

## 🔄 Fluxo de Requisição

```
Cliente
  ↓
Express (server.js)
  ↓
Middleware (helmet, cors, rate-limit)
  ↓
Routes (/api/*)
  ↓
Middleware (auth, validation)
  ↓
Controllers (lógica de negócio)
  ↓
Models (MongoDB)
  ↓
Response (JSON)
```

## 📦 Módulos Principais

### 1. Autenticação

```
Request → auth.js → User.findOne() → next()
```

### 2. Validação

```
Request → validation.js → Verifica dados → next()
```

### 3. Geração de API Key

```
POST /api/generate-api-key
  → apiKeyController.js
  → keyGenerator.js
  → User.save()
  → Response
```

### 4. Envio de Likes

```
POST /api/send-likes
  → auth.js
  → validation.js
  → likesController.js
  → axios (API externa)
  → Token.save()
  → Response
```

## 🎯 Convenções

### Nomenclatura de Arquivos

- **Controllers**: `*Controller.js` (ex: `apiKeyController.js`)
- **Models**: PascalCase (ex: `User.js`)
- **Middleware**: camelCase (ex: `auth.js`)
- **Utils**: camelCase (ex: `keyGenerator.js`)
- **Tests**: `*.test.js` ou `*.spec.js`

### Importações

```javascript
// Bibliotecas externas primeiro
const express = require('express');
const mongoose = require('mongoose');

// Módulos locais depois
const User = require('./models/User');
const { generateApiKey } = require('./utils/keyGenerator');
```

### Exportações

```javascript
// Exportação nomeada (preferida)
module.exports = {
  generateApiKey,
  sendLikes,
};

// Exportação default (quando há apenas uma)
module.exports = User;
```

## 🔧 Configuração

### Variáveis de Ambiente

Todas as configurações sensíveis ficam no `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/freefire
EXTERNAL_API_URL=https://api.example.com
```

### Constantes

Valores fixos ficam em `src/config/constants.js`:

```javascript
const VALID_REGIONS = ['BR', 'NA', 'SA'];
const HTTP_STATUS = { OK: 200, BAD_REQUEST: 400 };
```

## 📊 Dependências

### Produção

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **axios**: Cliente HTTP
- **helmet**: Segurança
- **cors**: CORS
- **morgan**: Logging
- **dotenv**: Variáveis de ambiente

### Desenvolvimento

- **eslint**: Linting
- **prettier**: Formatação
- **jest**: Testes
- **supertest**: Testes de API

## 🚀 Próximos Passos

Para adicionar novas features:

1. **Model**: Crie em `src/models/`
2. **Controller**: Implemente em `src/controllers/`
3. **Route**: Adicione em `src/routes/`
4. **Middleware**: Se necessário, em `src/middleware/`
5. **Tests**: Escreva em `tests/`
6. **Docs**: Atualize em `docs/`

---

**Dica**: Use esta estrutura como referência ao navegar ou modificar o projeto!
