# Guia de Contribuição

Obrigado por considerar contribuir para o projeto API de Likes Free Fire! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)

## 🤝 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, espera-se que você mantenha este código. Por favor, reporte comportamentos inaceitáveis.

## 🚀 Como Contribuir

Existem várias formas de contribuir:

1. **Reportar bugs** - Encontrou um problema? Abra uma issue
2. **Sugerir melhorias** - Tem uma ideia? Compartilhe conosco
3. **Escrever código** - Corrija bugs ou implemente features
4. **Melhorar documentação** - Ajude outros a entender o projeto
5. **Escrever testes** - Aumente a cobertura de testes

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js 14+
- MongoDB 4.4+
- Git

### Passos

1. **Fork o repositório**

```bash
# Clique em "Fork" no GitHub
```

2. **Clone seu fork**

```bash
git clone https://github.com/seu-usuario/freefire-likes-api.git
cd freefire-likes-api
```

3. **Adicione o repositório original como upstream**

```bash
git remote add upstream https://github.com/original/freefire-likes-api.git
```

4. **Instale as dependências**

```bash
npm install
```

5. **Configure o ambiente**

```bash
npm run setup
```

6. **Execute os testes**

```bash
npm test
```

## 📝 Padrões de Código

### Estilo de Código

Este projeto usa:

- **ESLint** para linting
- **Prettier** para formatação
- **EditorConfig** para consistência

Execute antes de commitar:

```bash
npm run lint        # Verifica problemas
npm run lint:fix    # Corrige automaticamente
npm run format      # Formata o código
```

### Convenções

#### Nomenclatura

- **Variáveis e funções**: camelCase (`getUserData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Classes**: PascalCase (`UserController`)
- **Arquivos**: kebab-case (`api-key-controller.js`)

#### Estrutura de Arquivos

```
src/
├── config/         # Configurações
├── controllers/    # Lógica de negócio
├── middleware/     # Middlewares
├── models/         # Schemas do MongoDB
├── routes/         # Definição de rotas
├── services/       # Serviços externos
└── utils/          # Utilitários
```

#### Comentários

Use JSDoc para documentar funções:

```javascript
/**
 * Envia likes para um usuário
 * @param {string} uid - UID do usuário
 * @param {string} region - Região do servidor
 * @returns {Promise<Object>} Resposta da API
 */
async function sendLikes(uid, region) {
  // ...
}
```

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição curta

Descrição detalhada (opcional)

Rodapé (opcional)
```

**Tipos:**

- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

**Exemplos:**

```
feat(api): adiciona endpoint de estatísticas
fix(auth): corrige validação de API key
docs(readme): atualiza instruções de instalação
test(unit): adiciona testes para keyGenerator
```

## 🔄 Processo de Pull Request

1. **Crie uma branch**

```bash
git checkout -b feat/minha-feature
```

2. **Faça suas alterações**

```bash
# Edite os arquivos
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

3. **Mantenha sua branch atualizada**

```bash
git fetch upstream
git rebase upstream/main
```

4. **Execute os testes**

```bash
npm test
npm run lint
```

5. **Push para seu fork**

```bash
git push origin feat/minha-feature
```

6. **Abra um Pull Request**

- Vá para o GitHub
- Clique em "New Pull Request"
- Preencha o template
- Aguarde review

### Checklist do PR

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Commits seguem Conventional Commits
- [ ] Todos os testes passam
- [ ] Sem conflitos com a branch main

## 🐛 Reportar Bugs

Ao reportar um bug, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir**
3. **Comportamento esperado**
4. **Comportamento atual**
5. **Ambiente** (OS, Node.js, MongoDB)
6. **Logs/Screenshots** (se aplicável)

**Template:**

```markdown
## Descrição
[Descrição clara do bug]

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que acontece]

## Ambiente
- OS: [Ubuntu 22.04]
- Node.js: [v18.0.0]
- MongoDB: [v6.0]

## Logs
```
[Cole os logs aqui]
```
```

## 💡 Sugerir Melhorias

Ao sugerir uma melhoria, inclua:

1. **Problema que resolve**
2. **Solução proposta**
3. **Alternativas consideradas**
4. **Impacto** (breaking changes?)

## 🧪 Testes

### Executar Testes

```bash
npm test              # Todos os testes
npm run test:unit     # Apenas unitários
npm run test:integration  # Apenas integração
npm run test:watch    # Modo watch
```

### Escrever Testes

- Testes unitários em `tests/unit/`
- Testes de integração em `tests/integration/`
- Use fixtures em `tests/fixtures/`

**Exemplo:**

```javascript
describe('Feature', () => {
  test('deve fazer algo', () => {
    expect(resultado).toBe(esperado);
  });
});
```

## 📚 Recursos

- [Node.js Docs](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Jest Documentation](https://jestjs.io/docs/)

## ❓ Dúvidas?

- Abra uma issue com a tag `question`
- Entre em contato com os mantenedores

---

**Obrigado por contribuir!** 🎉
