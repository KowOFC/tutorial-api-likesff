/**
 * Testes de integração para as rotas da API
 */

const request = require('supertest');
const mongoose = require('mongoose');

// Mock do app (você precisará ajustar conforme sua estrutura)
let app;
let server;

beforeAll(async () => {
  // Conecta ao banco de dados de teste
  const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/freefire-test';
  await mongoose.connect(mongoUri);
  
  // Importa o app após conectar ao banco
  app = require('../../server');
});

afterAll(async () => {
  // Limpa o banco de dados de teste
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }
});

describe('API Routes', () => {
  describe('GET /api/health', () => {
    test('deve retornar status OK', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/generate-api-key', () => {
    test('deve gerar uma nova API key', async () => {
      const response = await request(app)
        .post('/api/generate-api-key')
        .expect('Content-Type', /json/)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.apiKey).toBeDefined();
      expect(response.body.data.createdAt).toBeDefined();
    });

    test('API key gerada deve ser um UUID válido', async () => {
      const response = await request(app)
        .post('/api/generate-api-key')
        .expect(201);
      
      const apiKey = response.body.data.apiKey;
      expect(apiKey).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });
  });

  describe('POST /api/send-likes', () => {
    let apiKey;

    beforeAll(async () => {
      // Gera uma API key para usar nos testes
      const response = await request(app).post('/api/generate-api-key');
      apiKey = response.body.data.apiKey;
    });

    test('deve retornar erro sem API key', async () => {
      const response = await request(app)
        .post('/api/send-likes')
        .send({
          uid: '123456789',
          region: 'BR',
          accessToken: 'test-token',
        })
        .expect(401);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('API key');
    });

    test('deve retornar erro com API key inválida', async () => {
      const response = await request(app)
        .post('/api/send-likes')
        .set('x-api-key', 'invalid-key')
        .send({
          uid: '123456789',
          region: 'BR',
          accessToken: 'test-token',
        })
        .expect(401);
      
      expect(response.body.success).toBe(false);
    });

    test('deve retornar erro com campos ausentes', async () => {
      const response = await request(app)
        .post('/api/send-likes')
        .set('x-api-key', apiKey)
        .send({})
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.required).toBeDefined();
    });

    test('deve retornar erro com UID inválido', async () => {
      const response = await request(app)
        .post('/api/send-likes')
        .set('x-api-key', apiKey)
        .send({
          uid: 'abc123',
          region: 'BR',
          accessToken: 'test-token',
        })
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('UID');
    });

    test('deve retornar erro com região inválida', async () => {
      const response = await request(app)
        .post('/api/send-likes')
        .set('x-api-key', apiKey)
        .send({
          uid: '123456789',
          region: 'XX',
          accessToken: 'test-token',
        })
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Região');
      expect(response.body.validRegions).toBeDefined();
    });
  });

  describe('GET /api/get-token', () => {
    let apiKey;

    beforeAll(async () => {
      const response = await request(app).post('/api/generate-api-key');
      apiKey = response.body.data.apiKey;
    });

    test('deve retornar erro sem API key', async () => {
      const response = await request(app)
        .get('/api/get-token')
        .expect(401);
      
      expect(response.body.success).toBe(false);
    });

    test('deve retornar 404 quando não há token salvo', async () => {
      const response = await request(app)
        .get('/api/get-token')
        .set('x-api-key', apiKey)
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });
  });

  describe('404 Handler', () => {
    test('deve retornar 404 para rotas não existentes', async () => {
      const response = await request(app)
        .get('/api/rota-inexistente')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('não encontrada');
    });
  });
});
