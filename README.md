# Labecommerce

Labecommerce é um projeto desenvolvido no curso de Web Full-Stack da Labenu, com o objetivo de criar uma API de um e-commerce.



####  Endpoints

- Create user
- Get all users 
- Create product
- Get all products 
- Get products by name
- Edit product by id
- Create purchase
- Delete purchase by id
- Get purchase by id      



## Requisições (Paths): 

#### Requisições de Usuários

- /users

#### Requisições de Produtos

- /products/search

#### Requisições de Compras

- /purchases

  

## Exemplos de requisição:

### GET /users

Endpoint que busca por todos os usuários cadastrado

```json
[
    {
        "id": "user001",
        "name": "Natasha Romanoff",
        "email": "black-avenger@hotmail.com",
        "password": "vingadoramaisf0d0n4",
        "created_at": "2023-07-17 15:56:35"
    },
    {
        "id": "user002",
        "name": "Steve Rogers",
        "email": "america-cap@gmail.com",
        "password": "ilovepeggycarter",
        "created_at": "2023-07-17 15:56:35"
    },
    {
        "id": "user003",
        "name": "Thor",
        "email": "for-asgard@gmail.com",
        "password": "playboyzinho",
        "created_at": "2023-07-17 15:56:35"
    },
    {
        "id": "user005",
        "name": "Carol Denvers",
        "email": "cap-marvel@gmail.com",
        "password": "marvelouslykickingtheassofthanos",
        "created_at": "2023-07-17 16:19:28"
    },
    {
        "id": "user007",
        "name": "Tony Stark",
        "email": "stark@gmail.com",
        "password": "genio-bilionario-filantropo-playboy",
        "created_at": "2023-07-17 17:24:43"
    }
]
```

### POST /users

Endpoint para criar um novo usuário.

```json
Usuário cadastrado com sucesso!
```

### POST /products

Cadastra um novo produto.

```json
Produto cadastrado com sucesso!
```

### GET /products  ou  GET /products/search?query=texto

Retorna todos os produtos cadastrados. Se for informando um nome de produto para pesquisa, esse produto, caso exista, é retornado.

* Retorno sem busca:

```json
[
    {
        "id": "prod001",
        "name": "Smart Phone",
        "price": 3000,
        "description": "Smartphone de última geração",
        "image_url": "https://picsum.photos/200/300"
    },
    {
        "id": "prod002",
        "name": "Smart TV Roku",
        "price": 4000,
        "description": "Diversos aplicativos gratuitos",
        "image_url": "https://picsum.photos/200/300"
    },
    {
        "id": "prod004",
        "name": "Cadeira Gamer",
        "price": 3000,
        "description": "O melhor em conforto durante seus jogos!",
        "image_url": "https://picsum.photos/200/300"
    },
    {
        "id": "prod005",
        "name": "Kit Gamer Headphones + Mouse + 1 Game",
        "price": 2000,
        "description": "O trio que você precisava!",
        "image_url": "https://picsum.photos/200/300"
    },
    {
        "id": "prod006",
        "name": "Notebook",
        "price": 7000,
        "description": "Trabalho ou estudos, sempre com você!",
        "image_url": "https://picsum.photos/seed/Monitor/400"
    }
]
```

* Retorno com busca pelo nome do produto

```json
[
    {
        "id": "prod002",
        "name": "Monitor",
        "price": 900,
        "description": "Monitor LED Full HD 24 polegadas.",
        "imageUrl": "https://picsum.photos/seed/Monitor/400"
    }
]
```

### PUT /products/:id

Edita um produto pela sua ID

```json
Produto atualizado com sucesso
```

### POST /purchases

Cadastra um novo pedido.

```json
{
    "message": "Pedido realizado com sucesso"
}
```

### DELETE /purchases/:id

Endpoint que deleta um pedido pela sua ID.

```json
Compra deletada com sucesso
```

### GET purchases/:id

Endpoint que faz a busca de uma compra pela sua ID.

```json
{
    "purchaseId": "pur005",
    "buyerId": "user003",
    "buyerName": "Thor",
    "buyerEmail": "for-asgard@gmail.com",
    "totalPrice": 20000,
    "createdAt": "2023-07-17 17:08:53",
    "products": [
        {
            "id": "prod001",
            "name": "Smart Phone",
            "price": 3000,
            "description": "Smartphone de última geração",
            "imageUrl": "https://picsum.photos/200/300",
            "quantity": 2
        },
        {
            "id": "prod002",
            "name": "Smart TV Roku",
            "price": 4000,
            "description": "Diversos aplicativos gratuitos",
            "imageUrl": "https://picsum.photos/200/300",
            "quantity": 1
        }
    ]
}
```

## Como rodar este projeto

Para baixar e instalar este projeto, é necessário que tenha o git e o node instalados.

### Links para baixar o  <a href="https://nodejs.org/en">Node</a>  e o <a href="https://git-scm.com/">Git</a>

Se já tem ambos instalados ou após instalar, siga os seguintes passos:

```bash
# Copie o link

https://github.com/carolcampos22/projeto-labecommerce-backend

# Abra um terminal e digite o comando

git clone (url copiada)

# acesse a pasta criada com o comando

cd labecommerce-backend

# Instale as dependências
npm install
#ou
yarn install

# Para executar o Projeto
npm run start
#ou 
yarn start

```



## Tecnologias utilizadas

- Node.js
- TypeScript
- Node Express
- SQL
- SQLite
- Knex.js



## Link da documentação: 

https://documenter.getpostman.com/view/26570634/2s93z6e4CJ



## Pessoas autoras

<h3>Carolina M. Campos</h3>

LinkedIn: https://www.linkedin.com/in/carolcampos22

