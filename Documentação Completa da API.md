# Documentação Completa da API

## Visão Geral

Esta API permite o envio de likes para perfis do Free Fire através de um sistema de autenticação baseado em API Keys. A API é construída com Node.js puro e MongoDB.

## Base URL

```
http://localhost:3000/api
```

## Autenticação

A maioria dos endpoints requer autenticação via API Key. A chave deve ser enviada no header da requisição:

```
x-api-key: sua-api-key-aqui
```

## Endpoints

### 1. Gerar API Key

Cria uma nova API key anônima que pode ser usada para autenticar requisições.

**Endpoint:** `POST /api/generate-api-key`

**Autenticação:** Não requerida

**Request:**

```http
POST /api/generate-api-key HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

**Response (200 OK):**

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

**Response (500 Internal Server Error):**

```json
{
  "success": false,
  "message": "Erro ao gerar API key"
}
```

---

### 2. Enviar Likes

Envia likes para um usuário do Free Fire através da API externa.

**Endpoint:** `POST /api/send-likes`

**Autenticação:** Requerida

**Headers:**

```
x-api-key: sua-api-key-aqui
Content-Type: application/json
```

**Request Body:**

```json
{
  "uid": "123456789",
  "region": "BR",
  "accessToken": "seu_token_de_acesso"
}
```

**Parâmetros:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| uid | string | Sim | UID do usuário (apenas números) |
| region | string | Sim | Região do servidor (BR, NA, SA, EU, AS, OC) |
| accessToken | string | Sim | Token de acesso do usuário |

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Likes enviados com sucesso",
  "data": {
    "uid": "123456789",
    "region": "BR",
    "response": {
      "success": true,
      "message": "Likes sent successfully"
    }
  }
}
```

**Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "UID deve conter apenas números"
}
```

```json
{
  "success": false,
  "message": "Região inválida. Regiões válidas: BR, NA, SA, EU, AS, OC",
  "validRegions": ["BR", "NA", "SA", "EU", "AS", "OC"]
}
```

```json
{
  "success": false,
  "message": "Campos obrigatórios ausentes",
  "required": ["uid", "region", "accessToken"]
}
```

**Response (401 Unauthorized):**

```json
{
  "success": false,
  "message": "API key é obrigatória no header x-api-key"
}
```

```json
{
  "success": false,
  "message": "API key inválida ou não encontrada"
}
```

**Response (500 Internal Server Error):**

```json
{
  "success": false,
  "message": "Erro ao comunicar com a API externa: Connection timeout"
}
```

---

### 3. Recuperar Token Salvo

Recupera o token de acesso salvo anteriormente para o usuário autenticado.

**Endpoint:** `GET /api/get-token`

**Autenticação:** Requerida

**Headers:**

```
x-api-key: sua-api-key-aqui
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Token recuperado com sucesso",
  "data": {
    "accessToken": "token_salvo_anteriormente",
    "expiresAt": "2024-01-02T00:00:00.000Z",
    "lastUsed": "2024-01-01T12:00:00.000Z"
  }
}
```

**Response (404 Not Found):**

```json
{
  "success": false,
  "message": "Nenhum token salvo para este usuário"
}
```

**Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Token expirado. Envie um novo token via /send-likes"
}
```

**Response (401 Unauthorized):**

```json
{
  "success": false,
  "message": "API key é obrigatória no header x-api-key"
}
```

---

### 4. Health Check

Verifica o status da API e retorna informações sobre o servidor.

**Endpoint:** `GET /api/health`

**Autenticação:** Não requerida

**Response (200 OK):**

```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600
}
```

---

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos ou ausentes |
| 401 | Unauthorized - Autenticação falhou |
| 404 | Not Found - Recurso não encontrado |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Erro no servidor |

---

## Rate Limiting

A API implementa rate limiting para prevenir abuso:

- **Janela:** 15 minutos (900.000 ms)
- **Máximo de requisições:** 100 por IP

Quando o limite é excedido, a API retorna:

```json
{
  "success": false,
  "message": "Muitas requisições. Tente novamente mais tarde."
}
```

---

## Regiões Válidas

| Código | Região |
|--------|--------|
| BR | Brasil |
| NA | América do Norte |
| SA | América do Sul |
| EU | Europa |
| AS | Ásia |
| OC | Oceania |

---

## Exemplos de Uso

### cURL

**Gerar API Key:**

```bash
curl -X POST http://localhost:3000/api/generate-api-key \
  -H "Content-Type: application/json"
```

**Enviar Likes:**

```bash
curl -X POST http://localhost:3000/api/send-likes \
  -H "Content-Type: application/json" \
  -H "x-api-key: sua-api-key-aqui" \
  -d '{
    "uid": "123456789",
    "region": "BR",
    "accessToken": "seu_token_aqui"
  }'
```

**Recuperar Token:**

```bash
curl -X GET http://localhost:3000/api/get-token \
  -H "x-api-key: sua-api-key-aqui"
```

### JavaScript (Fetch API)

**Gerar API Key:**

```javascript
fetch('http://localhost:3000/api/generate-api-key', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

**Enviar Likes:**

```javascript
fetch('http://localhost:3000/api/send-likes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'sua-api-key-aqui'
  },
  body: JSON.stringify({
    uid: '123456789',
    region: 'BR',
    accessToken: 'seu_token_aqui'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

### Python (Requests)

**Gerar API Key:**

```python
import requests

response = requests.post('http://localhost:3000/api/generate-api-key')
data = response.json()
print(data)
```

**Enviar Likes:**

```python
import requests

headers = {
    'Content-Type': 'application/json',
    'x-api-key': 'sua-api-key-aqui'
}

payload = {
    'uid': '123456789',
    'region': 'BR',
    'accessToken': 'seu_token_aqui'
}

response = requests.post(
    'http://localhost:3000/api/send-likes',
    headers=headers,
    json=payload
)

data = response.json()
print(data)
```

---

## Tratamento de Erros

Todos os erros seguem o mesmo formato de resposta:

```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

Em ambiente de desenvolvimento, o stack trace também é incluído:

```json
{
  "success": false,
  "message": "Descrição do erro",
  "stack": "Error: ...\n    at ..."
}
```

---

## Segurança

### Headers de Segurança (Helmet)

A API utiliza Helmet para adicionar headers de segurança:

- `Content-Security-Policy`
- `X-DNS-Prefetch-Control`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`

### CORS

CORS está habilitado para permitir requisições de diferentes origens. Configure no `.env`:

```env
ALLOWED_ORIGINS=http://localhost:3000,https://seudominio.com
```

---

## Monitoramento

### Logs

A API utiliza Morgan para logging:

- **Desenvolvimento:** Formato `dev` (colorido e conciso)
- **Produção:** Formato `combined` (Apache style)

### Uptime

Use o endpoint `/api/health` para monitorar o uptime do servidor.

---

## Troubleshooting

### Erro: "MongoDB conectado"

Verifique se o MongoDB está rodando:

```bash
sudo systemctl status mongod
```

### Erro: "API key inválida"

Certifique-se de que:
1. A API key foi gerada corretamente
2. O header `x-api-key` está presente
3. A API key não foi removida do banco de dados

### Erro: "Timeout ao conectar com a API externa"

A API externa pode estar fora do ar ou lenta. Ajuste o timeout no `.env`:

```env
API_TIMEOUT=20000
```

---

## Suporte

Para reportar bugs ou solicitar features, abra uma issue no repositório.
