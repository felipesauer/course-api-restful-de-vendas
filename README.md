# API Vendas

O objetivo desta API é proporcionar um ambiente de estudo onde eu aplico algumas habilidades adquiridas em cursos, seguindo o conceito de APIs RESTful.

## 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste. Consulte a seção **[Implantação](#-implantação)** para saber como implantar o projeto.

### 📋 Pré-requisitos

Certifique-se de ter as seguintes versões mínimas instaladas:

- Node.js ≥v18.14.0 ![badge](https://img.shields.io/badge/NODEJS-≥v18.14.0-339933?style=for-the-badge&logo=nodedotjs)
- PostgreSQL ≥v12.12 ![badge](https://img.shields.io/badge/POSTGRES-≥v12.12-4169E1?style=for-the-badge&logo=postgresql)
- Redis ≥v7.0.8 ![badge](https://img.shields.io/badge/REDIS-≥v7.0.8-DC382D?style=for-the-badge&logo=redis)
- NPM ≥v9.3.1 ![badge](https://img.shields.io/badge/NPM-≥v9.3.1-CB3837?style=for-the-badge&logo=npm)

### 🔧 Instalação

Siga as etapas abaixo para configurar o projeto:

1. Clone este repositório para sua máquina local.

```
git clone https://github.com/seu-usuario/api-vendas.git
```

2. Acesse a pasta do projeto.

```
cd api-vendas
```

3. Instale as dependências do projeto.

```
npm install
```

4. Renomeie o arquivo **.env.exemplo** para **.env** e preencha as informações necessárias de configuração:

```properties
# Configuração da API
APP_SECRET= # Hash usado pela aplicação
APP_PORT= # Porta usada pela aplicação

# Configuração do Redis
REDIS_HOST= # Host do redis Ex.: localhost
REDIS_PORT= # Porta do redis Ex.: 6379
REDIS_PASS= # Senha do redis

# Configuração do Banco de Dados
DB_TYPE= # Tipo do banco de dados (postgres)
DB_HOST= # Host do banco de dados Ex.: localhost
DB_PORT= # Porta do banco de dados Ex.: 5432
DB_USERNAME= # Nome de usuário do banco de dados
DB_PASSWORD= # Senha do banco de dados
DB_DATABASE= # Nome do banco de dados
```

5. Após configurar o arquivo **.env**, execute o seguinte comando para iniciar o servidor de desenvolvimento:

```
npm run dev
```

6. O servidor de desenvolvimento será iniciado e você verá uma saída semelhante a esta no seu console:

![image](https://user-images.githubusercontent.com/120697114/218758173-0ad2cd5a-7bb0-40f9-b9d6-09803081cfce.png)

## ⚙️ Executando os testes

Os testes são organizados da seguinte forma:

```
├── src
|   └── modules
│       └── customers/services/*.ts
|       └── orders/services/*.ts
|       └── products/services/*.ts
|       └── users/services/*.ts
|   └── shared
|       └── cache/redis/*.ts
|       └── errors/*.ts
|       └── infra/http/express/middlewares/*.ts
|       └── providers
|           └── hash/bcryptjs/*.ts
|           └── token/jwt/*.ts
```

Execute os **testes** com o seguinte comando:

```
npm run test
```

Após a execução, será gerada uma pasta chamada **coverage** na raiz do projeto. A cobertura dos testes da aplicação pode ser visualizada abrindo o arquivo **index.html** dentro da pasta **coverage**:

```
coverage/lcov-report/index.html
```

Você verá uma exibição semelhante a esta:

![image](https://user-images.githubusercontent.com/120697114/218764949-bece63be-3094-46a5-92dd-cb4f46eb7f45.png)

Na pasta **doc** do projeto, você encontrará um arquivo JSON [collection](https://github.com/felipesauer/api-vendas/blob/main/doc/api-vendas.postman_collection.json) para importar no Postman e realizar testes reais na aplicação.

## 📦 Implantação

Para implantar a API em um ambiente de produção, você deve gerar o build da mesma. Execute o seguinte comando:

```
npm run build
```

Uma pasta chamada **dist** será criada na raiz do projeto. Essa é a versão para produção.

**Observação:** O arquivo **.env** deve ser movido manualmente para o ambiente de produção.

## 🖇️ Colaborando

Este projeto está aberto para colaboração de qualquer pessoa.

## ✒️ Autores

* **Felipe Sauer** - *Autor* - [felipesauer](https://github.com/felipesauer)

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](https://github.com/felipesauer/api-vendas/blob/main/LICENSE).

## 🛠️ Construído com

- [Redis](https://redis.io/) - Usado para cache na aplicação
- [Node.js](https://nodejs.org/en/) - Usado para interpretar o JavaScript/TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados utilizado na API
- [Express](https://expressjs.com/pt-br/) - Responsável pelas rotas da API
- [TypeScript](https://www.typescriptlang.org/) - Sim ❤️
- [Jest](https://jestjs.io/pt-BR/) - Usado para realizar testes na aplicação
- [Babel](https://babeljs.io/) - Usado para converter o código TypeScript em JavaScript
- Joi & Celebrate - Ambos usados para controle nos parâmetros das rotas da API
- [Postman](https://www.postman.com/) - Usado para testar a API

Existem outras ferramentas/bibliotecas utilizadas no projeto, mas as mencionadas acima são as principais.

---
⌨️ com ❤️ por [Felipe Sauer](https://github.com/felipesauer) 😊
