/**
 * Testes unitários para o gerador de API keys
 */

const {
  generateApiKey,
  generateAnonymousUsername,
  generateTemporaryEmail,
} = require('../../src/utils/keyGenerator');

describe('Key Generator Utils', () => {
  describe('generateApiKey', () => {
    test('deve gerar uma API key válida no formato UUID', () => {
      const apiKey = generateApiKey();
      
      expect(apiKey).toBeDefined();
      expect(typeof apiKey).toBe('string');
      expect(apiKey).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    test('deve gerar API keys únicas', () => {
      const key1 = generateApiKey();
      const key2 = generateApiKey();
      
      expect(key1).not.toBe(key2);
    });

    test('deve gerar 1000 API keys únicas', () => {
      const keys = new Set();
      
      for (let i = 0; i < 1000; i++) {
        keys.add(generateApiKey());
      }
      
      expect(keys.size).toBe(1000);
    });
  });

  describe('generateAnonymousUsername', () => {
    test('deve gerar um username anônimo', () => {
      const username = generateAnonymousUsername();
      
      expect(username).toBeDefined();
      expect(typeof username).toBe('string');
      expect(username).toMatch(/^anon-\d+-[a-f0-9]{8}$/);
    });

    test('deve gerar usernames únicos', () => {
      const username1 = generateAnonymousUsername();
      const username2 = generateAnonymousUsername();
      
      expect(username1).not.toBe(username2);
    });

    test('deve começar com "anon-"', () => {
      const username = generateAnonymousUsername();
      
      expect(username.startsWith('anon-')).toBe(true);
    });
  });

  describe('generateTemporaryEmail', () => {
    test('deve gerar um email temporário válido', () => {
      const email = generateTemporaryEmail();
      
      expect(email).toBeDefined();
      expect(typeof email).toBe('string');
      expect(email).toMatch(/^anon-\d+-[a-f0-9]{8}@temp\.local$/);
    });

    test('deve gerar emails únicos', () => {
      const email1 = generateTemporaryEmail();
      const email2 = generateTemporaryEmail();
      
      expect(email1).not.toBe(email2);
    });

    test('deve terminar com "@temp.local"', () => {
      const email = generateTemporaryEmail();
      
      expect(email.endsWith('@temp.local')).toBe(true);
    });

    test('deve conter "@" no email', () => {
      const email = generateTemporaryEmail();
      
      expect(email).toContain('@');
    });
  });
});
