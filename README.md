# Api Vendas

O intuito da API é voltada para estudo, onde eu aplico algumas "skils" aprendidas decorrente a cursos feitos, seguindo o conceito de APIs RESTFUL.

# 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.
Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

![badge](https://img.shields.io/badge/NODEJS-≥v18.14.0-339933?style=for-the-badge&logo=nodedotjs) ![badge](https://img.shields.io/badge/POSTGRES-≥v12.12-4169E1?style=for-the-badge&logo=postgresql) ![badge](https://img.shields.io/badge/REDIS-≥v7.0.8-DC382D?style=for-the-badge&logo=redis) ![badge](https://img.shields.io/badge/NPM-≥v9.3.1-CB3837?style=for-the-badge&logo=npm)

### 🔧 Instalação

Depois de realizar as instalações do **[pré-requisitos](#-pré-requisitos)** na pasta do projeto execute os seguintes comandos.

```
npm i
```

Altere o nome do arquivo **.env.exemplo** para **.env**:

```properties
# Api Config
APP_SECRET= #Hash usado pela aplicação
APP_PORT= #Porta usado pela aplicação

# Redis Config
REDIS_HOST= #Host do redis Ex.: localhost
REDIS_PORT= #Porta do redis Ex.: 6379
REDIS_PASS= #Senha do redis

# Database Config
DB_TYPE= #Tipo do banco de dados (postgres)
DB_HOST= #Host do banco de dados Ex.: localhost
DB_PORT= #Porta do banco de dados Ex.: 5432
DB_USERNAME= #Username do banco de dados
DB_PASSWORD= #Password do banco de dados
DB_DATABASE= #Nome do banco de dados
```

Depois do **.env** configurado execute o seguinte comando:

```
npm run dev
```

Algo parecido com isso deverá ser impresso no seu console
![image](https://user-images.githubusercontent.com/120697114/218758173-0ad2cd5a-7bb0-40f9-b9d6-09803081cfce.png)


## ⚙️ Executando os testes

Os teste é rastreado da seguinte forma:

```
├── src
|   └── modules
│       └── customers/services
|       └── orders/services
|       └── products/services
|       └── users/services
|   └── shared
|       └── cache/redis
|       └── errors
|       └── infra/http/express/middlewares
|       └── providers
|           └── hash/bcryptjs
|           └── token/jwt
```

Os **tests** é executado com o seguinte comando:

```
npm run test
```

Após executado uma pasta é gerada na raiz do projeto chamada **coverage**, coverage é uma configuração do JEST para fins de visualizar a cobertura dos testes da aplicação.

Abra o **index.html** dentro da pasta **coverage**
```
coverage/lcov-report/index.html
```

Algo parecido deverá ser exibido
![image](https://user-images.githubusercontent.com/120697114/218764949-bece63be-3094-46a5-92dd-cb4f46eb7f45.png)

Na raiz do projeto na pasta **doc** contém um *json* [collection](https://github.com/felipesauer/api-vendas/blob/main/doc/api-vendas.postman_collection.json) para importar dentro do Postman, e assim realizar teste reais na aplicação.


## 📦 Implantação

Para a implantação da API deve ser gerado o build da mesma, o seguinte comando deve ser executado:

```
npm run build
```

Uma parta chamada **dist** será criada na raiz do projeto, esse é a versão para produção.

**Obs.:** O arquivo **.env** deve ser movido manualmente para para.

## 🖇️ Colaborando

O projeto é aberto para colaboração de qualquer pessoa.

## ✒️ Autores

* **Felipe Sauer** - *Autor* - [felipesauer](https://github.com/felipesauer)

## 📄 Licença

Este projeto está sob a licença [MIT](https://github.com/felipesauer/api-vendas/blob/main/LICENSE).

## 🛠️ Construído com

- [Redis](https://redis.io/) - Usado para cache na aplicação
- [Node JS](https://nodejs.org/en/) - Usado para interpretar o javascript/typescript
- [Postgres](https://www.postgresql.org/) - Banco de dados utilizado na API
- [Express](https://expressjs.com/pt-br/) - Responsável pelas rotas da API
- [Typescript](https://www.typescriptlang.org/) - Sim ❤️
- [Jest](https://jestjs.io/pt-BR/) - Usado para realizar teste na aplicação
- [Babel](https://babeljs.io/) - Usado para converter o código em typescript em javascript
- Joi & Celebrate - Ambos usados para controle nos parâmetros das rotas da API
- [Postman](https://www.postman.com/) - Usado para testar a API

Existem outras ferramentas / Bibliotecas, porém as principais de destaque do projeto são essas.

---
⌨️ com ❤️ por [Felipe Sauer](https://github.com/felipesauer) 😊
