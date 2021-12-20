<h2 align="center">My books 📘</h2>

<p align="center">
  <a href="/">Tecnologias 🖥️</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="/">Layout 🎨</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="/">Como executar ▶️</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="/">Licença 📖</a>
</p>

## Objetivo
   Desafio desenvolvido para o programa de bolsas do DoWhile 2021.

   Lembra daquele livro que você leu e deixou jogado no canto? ou dos seus materiais escolares pegando poeira?
   Aqui você pode ajudar alguém com isso e ainda conseguir uma `renda extra` no final do mês!
   Faça uma boa ação, cadastre seu `livro não didático` e ajude pessoas próximas a você.

   Após o cadastro do usuário na api, é possível estar criando livros para doação especificando a categoria e informações básicas do livro, e até mesmo fazer pedidos de livros já cadastrados no banco de dados.
   É possível encontrar livros próximos a você com a busca por cep e cidade. Após encontrar o livro desejado, você pode fazer o pedido do livro criando uma order, essa order tem que ser aprovada pelo detentor do livro e após isso você vai estar livre para ir buscar o livro no endereço em que ele foi cadastrado.

## Tecnologias 🔭
  - Nestjs
  - Swagger UI
  - Typeorm
  - Jsonwebtoken
  - Postgres SQL
  

## Rotas

   - Swagger

      `[GET]` /api


## Iniciando a aplicação

```bash

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# tests 
$ yarn test
```

## Database

 ```bash
 # Run postgres
 $ docker-compose up -d
 ```

## License

Nest is [MIT licensed](LICENSE).
